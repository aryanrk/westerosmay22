/**
 * RealVoice AI Widget
 * Embeddable widget for real estate websites to add AI voice assistant functionality
 */

(function() {
  // Configuration
  const CONFIG = {
    containerClass: 'realvoice-widget-container',
    widgetId: '',
    agentId: '',
    agentName: 'AI Assistant',
    theme: {
      primaryColor: '#4f46e5',
      textColor: '#ffffff',
      backgroundColor: '#ffffff'
    },
    position: 'bottom-right',
    initialMessage: 'Hello! How can I help you today?',
    apiUrl: ''
  };
  
  // Widget HTML
  const HTML = `
    <div class="realvoice-widget">
      <button class="realvoice-widget-toggle">
        <span class="realvoice-widget-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </span>
      </button>
      <div class="realvoice-widget-panel">
        <div class="realvoice-widget-header">
          <h3 class="realvoice-widget-title"></h3>
          <button class="realvoice-widget-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="realvoice-widget-messages"></div>
        <div class="realvoice-widget-input">
          <input type="text" placeholder="Type your message..." />
          <button class="realvoice-widget-send">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
          <button class="realvoice-widget-mic">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
  
  // CSS
  const CSS = `
    .realvoice-widget-container {
      position: fixed;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }
    
    .realvoice-widget-container.bottom-right {
      bottom: 20px;
      right: 20px;
    }
    
    .realvoice-widget-container.bottom-left {
      bottom: 20px;
      left: 20px;
    }
    
    .realvoice-widget {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
    
    .realvoice-widget-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      margin-left: auto;
    }
    
    .realvoice-widget-panel {
      display: none;
      flex-direction: column;
      width: 360px;
      height: 500px;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
      overflow: hidden;
    }
    
    .realvoice-widget-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .realvoice-widget-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    
    .realvoice-widget-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
    }
    
    .realvoice-widget-close:hover {
      opacity: 1;
    }
    
    .realvoice-widget-messages {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
      display: flex;
      flex-direction: column;
    }
    
    .realvoice-widget-message {
      margin-bottom: 15px;
      max-width: 80%;
      padding: 12px;
      border-radius: 18px;
      position: relative;
    }
    
    .realvoice-widget-message.user {
      align-self: flex-end;
      border-bottom-right-radius: 5px;
    }
    
    .realvoice-widget-message.agent {
      align-self: flex-start;
      border-bottom-left-radius: 5px;
    }
    
    .realvoice-widget-input {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .realvoice-widget-input input {
      flex: 1;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      font-size: 14px;
    }
    
    .realvoice-widget-input button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      margin-left: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;
    }
    
    .realvoice-widget-input button:hover {
      opacity: 1;
    }
    
    .realvoice-widget-audio {
      display: none;
    }
    
    /* Animation */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .realvoice-widget-message {
      animation: fadeIn 0.3s ease-out;
    }
  `;
  
  // Widget Implementation
  class RealVoiceWidget {
    constructor(config) {
      this.config = Object.assign({}, CONFIG, config);
      this.conversationId = null;
      this.audioElements = {};
      this.init();
    }
    
    init() {
      this.createContainer();
      this.applyStyles();
      this.attachEventListeners();
      this.addInitialMessage();
    }
    
    createContainer() {
      const container = document.createElement('div');
      container.className = this.config.containerClass;
      container.classList.add(this.config.position);
      container.innerHTML = HTML;
      document.body.appendChild(container);
      
      this.container = container;
      this.toggle = container.querySelector('.realvoice-widget-toggle');
      this.panel = container.querySelector('.realvoice-widget-panel');
      this.messagesContainer = container.querySelector('.realvoice-widget-messages');
      this.input = container.querySelector('.realvoice-widget-input input');
      this.sendButton = container.querySelector('.realvoice-widget-send');
      this.micButton = container.querySelector('.realvoice-widget-mic');
      this.closeButton = container.querySelector('.realvoice-widget-close');
      this.title = container.querySelector('.realvoice-widget-title');
      
      // Set agent name
      this.title.textContent = this.config.agentName;
    }
    
    applyStyles() {
      // Add stylesheet
      const styleEl = document.createElement('style');
      styleEl.textContent = CSS;
      document.head.appendChild(styleEl);
      
      // Apply theme colors
      this.toggle.style.backgroundColor = this.config.theme.primaryColor;
      this.toggle.style.color = this.config.theme.textColor;
      this.panel.style.backgroundColor = this.config.theme.backgroundColor;
      this.title.style.color = this.config.theme.primaryColor;
      
      // Apply custom message styles
      const customStyles = `
        .realvoice-widget-message.user {
          background-color: ${this.config.theme.primaryColor};
          color: ${this.config.theme.textColor};
        }
        
        .realvoice-widget-message.agent {
          background-color: #f0f0f0;
          color: #333;
        }
        
        .realvoice-widget-send, .realvoice-widget-mic {
          color: ${this.config.theme.primaryColor};
        }
      `;
      
      styleEl.textContent += customStyles;
    }
    
    attachEventListeners() {
      // Toggle widget
      this.toggle.addEventListener('click', () => {
        if (this.panel.style.display === 'flex') {
          this.closePanel();
        } else {
          this.openPanel();
        }
      });
      
      // Close panel
      this.closeButton.addEventListener('click', () => {
        this.closePanel();
      });
      
      // Send message on button click
      this.sendButton.addEventListener('click', () => {
        this.sendMessage();
      });
      
      // Send message on Enter
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
      
      // Voice input
      this.micButton.addEventListener('click', () => {
        this.toggleVoiceInput();
      });
    }
    
    addInitialMessage() {
      this.addMessage(this.config.initialMessage, 'agent');
    }
    
    openPanel() {
      this.panel.style.display = 'flex';
    }
    
    closePanel() {
      this.panel.style.display = 'none';
    }
    
    addMessage(text, sender) {
      const messageEl = document.createElement('div');
      messageEl.className = `realvoice-widget-message ${sender}`;
      messageEl.textContent = text;
      
      this.messagesContainer.appendChild(messageEl);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    sendMessage() {
      const message = this.input.value.trim();
      if (!message) return;
      
      // Add user message
      this.addMessage(message, 'user');
      this.input.value = '';
      
      // Send to backend
      this.callApi(message);
    }
    
    async callApi(message) {
      try {
        const response = await fetch(`${this.config.apiUrl}/converse`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            agent_id: this.config.agentId,
            message,
            conversation_id: this.conversationId
          })
        });
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        this.conversationId = data.id;
        
        // Add agent response
        this.addMessage(data.response, 'agent');
        
        // Play audio if available
        if (data.audio_url) {
          this.playAudio(data.audio_url);
        }
      } catch (error) {
        console.error('Error calling API:', error);
        this.addMessage('Sorry, I encountered an error. Please try again later.', 'agent');
      }
    }
    
    playAudio(url) {
      let audio = this.audioElements[url];
      
      if (!audio) {
        audio = new Audio(url);
        this.audioElements[url] = audio;
      }
      
      audio.play();
    }
    
    toggleVoiceInput() {
      // Voice recognition implementation would go here
      // For now, just show a message
      alert('Voice input is not implemented in this demo.');
    }
  }
  
  // Initialize the widget
  function initWidget() {
    // Extract configuration from script tag
    const scriptTag = document.currentScript || document.querySelector('script[data-agent-id]');
    
    if (!scriptTag) {
      console.error('RealVoice Widget: Unable to find script tag with configuration');
      return;
    }
    
    const config = {
      widgetId: scriptTag.getAttribute('data-widget-id') || '',
      agentId: scriptTag.getAttribute('data-agent-id') || '',
      agentName: scriptTag.getAttribute('data-agent-name') || CONFIG.agentName,
      theme: {
        primaryColor: scriptTag.getAttribute('data-primary-color') || CONFIG.theme.primaryColor,
        textColor: scriptTag.getAttribute('data-text-color') || CONFIG.theme.textColor,
        backgroundColor: scriptTag.getAttribute('data-background-color') || CONFIG.theme.backgroundColor
      },
      position: scriptTag.getAttribute('data-position') || CONFIG.position,
      initialMessage: scriptTag.getAttribute('data-initial-message') || CONFIG.initialMessage,
      apiUrl: scriptTag.getAttribute('data-api-url') || window.location.origin
    };
    
    // Initialize widget
    window.realVoiceWidget = new RealVoiceWidget(config);
  }
  
  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})(); 