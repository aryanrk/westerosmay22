import { NextRequest, NextResponse } from 'next/server';

// For demo purposes, using the API key directly
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_7cf13b2dd39d6f278b39c1fd98dff6d3249b66374e7696c4';
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

export async function POST(request: NextRequest) {
  try {
    const { agent_id, eleven_labs_agent_id, files, textDocuments } = await request.json();
    
    if (!eleven_labs_agent_id) {
      return NextResponse.json(
        { error: 'Missing required field: eleven_labs_agent_id' },
        { status: 400 }
      );
    }

    if ((!files || files.length === 0) && (!textDocuments || textDocuments.length === 0)) {
      return NextResponse.json(
        { error: 'No files or text documents provided' },
        { status: 400 }
      );
    }
    
    console.log(`📁 Processing upload request for agent: ${eleven_labs_agent_id}`);
    console.log(`📄 Files: ${files?.length || 0}, Text docs: ${textDocuments?.length || 0}`);
    
    const uploadedDocuments = [];

    // Handle file uploads
    if (files && files.length > 0) {
      console.log(`📁 Uploading ${files.length} files to ElevenLabs knowledge base...`);
      
      for (const fileData of files) {
        try {
          // Convert base64 to blob for file upload
          const formData = new FormData();
          
          if (fileData.content) {
            const byteCharacters = atob(fileData.content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: fileData.type });
            
            formData.append('file', blob, fileData.name);
            if (fileData.name) {
              formData.append('name', fileData.name);
            }
          }
          
          console.log(`🔄 Uploading file to ${ELEVENLABS_API_URL}/convai/knowledge-base...`);
          
          const uploadResponse = await fetch(`${ELEVENLABS_API_URL}/convai/knowledge-base`, {
            method: 'POST',
            headers: {
              'xi-api-key': ELEVENLABS_API_KEY
            },
            body: formData
          });
          
          console.log(`📡 File upload response status: ${uploadResponse.status}`);
          console.log(`📡 File upload response headers:`, Object.fromEntries(uploadResponse.headers.entries()));
          
          if (uploadResponse.ok) {
            const knowledgeItem = await uploadResponse.json();
            console.log(`✅ File knowledge base response:`, knowledgeItem);
            
            const documentId = knowledgeItem.id || Math.random().toString(36);
            uploadedDocuments.push({
              id: documentId,
              name: fileData.name,
              original_name: fileData.name,
              size: fileData.size,
              type: fileData.type,
              isFile: true
            });
            console.log(`✅ Successfully uploaded file: ${fileData.name}, ID: ${documentId}`);
          } else {
            const errorData = await uploadResponse.text();
            console.error(`❌ Failed to upload file ${fileData.name}:`, errorData);
            throw new Error(`File upload failed: ${uploadResponse.status} - ${errorData}`);
          }
        } catch (error) {
          console.error(`💥 Error processing file ${fileData.name}:`, error);
          throw error;
        }
      }
    }

    // Handle text document creation
    if (textDocuments && textDocuments.length > 0) {
      console.log(`📝 Creating ${textDocuments.length} text documents in ElevenLabs knowledge base...`);
      
      for (const textDoc of textDocuments) {
        try {
          console.log(`🔄 Creating text document at ${ELEVENLABS_API_URL}/convai/knowledge-base/text...`);
          
          const textResponse = await fetch(`${ELEVENLABS_API_URL}/convai/knowledge-base/text`, {
            method: 'POST',
            headers: {
              'xi-api-key': ELEVENLABS_API_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: textDoc.content,
              name: textDoc.name
            })
          });
          
          console.log(`📡 Text creation response status: ${textResponse.status}`);
          console.log(`📡 Text creation response headers:`, Object.fromEntries(textResponse.headers.entries()));
          
          if (textResponse.ok) {
            const knowledgeItem = await textResponse.json();
            console.log(`✅ Text knowledge base response:`, knowledgeItem);
            
            const documentId = knowledgeItem.id || Math.random().toString(36);
            uploadedDocuments.push({
              id: documentId,
              name: textDoc.name,
              original_name: textDoc.name,
              size: textDoc.content.length,
              type: 'text/plain',
              content: textDoc.content,
              isText: true
            });
            console.log(`✅ Successfully created text document: ${textDoc.name}, ID: ${documentId}`);
          } else {
            const errorData = await textResponse.text();
            console.error(`❌ Failed to create text document ${textDoc.name}:`, errorData);
            throw new Error(`Text creation failed: ${textResponse.status} - ${errorData}`);
          }
        } catch (error) {
          console.error(`💥 Error processing text document ${textDoc.name}:`, error);
          throw error;
        }
      }
    }
    
    // Update agent with knowledge base items if any were uploaded/created
    if (uploadedDocuments.length > 0) {
      console.log('🔄 Updating agent with knowledge base items...', uploadedDocuments.map(d => ({ id: d.id, name: d.name, type: d.isFile ? 'file' : 'text' })));
      
      // First, get the current agent configuration
      const getAgentResponse = await fetch(`${ELEVENLABS_API_URL}/convai/agents/${eleven_labs_agent_id}`, {
        method: 'GET',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY
        }
      });
      
      console.log(`📡 Get agent response status: ${getAgentResponse.status}`);
      
      if (getAgentResponse.ok) {
        const currentAgent = await getAgentResponse.json();
        console.log('📄 Current agent config:', currentAgent);
        
        const existingKnowledgeIds = currentAgent.conversation_config?.knowledge_base?.knowledge_base_ids || [];
        const newKnowledgeIds = uploadedDocuments.map(doc => doc.id);
        const updatedKnowledgeIds = [...existingKnowledgeIds, ...newKnowledgeIds];
        
        console.log('🔄 Knowledge base IDs:', {
          existing: existingKnowledgeIds,
          new: newKnowledgeIds,
          updated: updatedKnowledgeIds
        });
        
        // Update the agent with new knowledge base items
        const updatePayload = {
          ...currentAgent,
          conversation_config: {
            ...currentAgent.conversation_config,
            knowledge_base: {
              ...currentAgent.conversation_config?.knowledge_base,
              knowledge_base_ids: updatedKnowledgeIds
            }
          }
        };
        
        console.log('📤 Updating agent with payload:', {
          agent_id: eleven_labs_agent_id,
          knowledge_base_count: updatedKnowledgeIds.length
        });
        
        const updateResponse = await fetch(`${ELEVENLABS_API_URL}/convai/agents/${eleven_labs_agent_id}`, {
          method: 'PATCH',
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatePayload)
        });
        
        console.log(`📡 Agent update response status: ${updateResponse.status}`);
        
        if (updateResponse.ok) {
          const updatedAgent = await updateResponse.json();
          console.log('✅ Successfully updated agent with knowledge base items');
        } else {
          const updateError = await updateResponse.text();
          console.error('❌ Failed to update agent:', updateError);
          // Don't throw error here, documents were still uploaded successfully
        }
      } else {
        const getError = await getAgentResponse.text();
        console.error('❌ Failed to get current agent config:', getError);
        // Don't throw error here, documents were still uploaded successfully
      }
    }
    
    console.log(`✅ Upload/creation completed. Total documents processed: ${uploadedDocuments.length}`);
    
    return NextResponse.json({
      success: true,
      message: `Successfully processed ${uploadedDocuments.length} document(s)`,
      documents: uploadedDocuments,
      stats: {
        files: files?.length || 0,
        textDocuments: textDocuments?.length || 0,
        total: uploadedDocuments.length
      }
    });

  } catch (error) {
    console.error('💥 Error in upload/creation process:', error);
    return NextResponse.json(
      { 
        error: 'Upload/creation failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 