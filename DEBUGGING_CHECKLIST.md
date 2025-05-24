# AI Assistant Debugging Checklist

## 🎯 **ALWAYS START WITH THE SIMPLEST ISSUES FIRST**

### **Step 1: Data Flow Validation (FIRST!)**
- [ ] What data is being SENT?
- [ ] What data is EXPECTED?
- [ ] Are required fields missing or malformed?
- [ ] Check for `undefined`, `null`, or empty values

### **Step 2: API Requirements**
- [ ] Read the actual API documentation for required fields
- [ ] Check example payloads in docs
- [ ] Validate against API schema/requirements

### **Step 3: Error Message Analysis**
- [ ] Get the actual error response from the API
- [ ] Read error messages literally - don't guess
- [ ] Look up error codes in documentation

### **Step 4: Input/Output Matching**
- [ ] Frontend sends: X
- [ ] Backend expects: Y
- [ ] API requires: Z
- [ ] Are X, Y, Z aligned?

### **Step 5: Test Components in Isolation**
- [ ] Test Edge Function directly with known good data
- [ ] Test Edge Function with frontend's actual data
- [ ] Compare responses

### **Step 6: Only THEN Consider Complex Issues**
- [ ] Deployment problems
- [ ] Caching issues
- [ ] Authentication problems
- [ ] Network/infrastructure issues

## 🚫 **DEBUGGING ANTI-PATTERNS TO AVOID**

1. **Assumption Jumping**: Don't assume deployment/caching without evidence
2. **Complex First**: Don't add logging/tooling before checking basics
3. **Solution Hopping**: Finish investigating one theory before moving to next
4. **Documentation Skipping**: Always check API docs for required fields

## ✅ **VALIDATION QUESTIONS TO ALWAYS ASK**

1. "What exactly is being sent to the API?"
2. "What does the API documentation say is required?"
3. "Are we sending all required fields with correct types?"
4. "What is the actual error message from the API?"
5. "Can I reproduce this with a minimal test case?"

## 🎓 **KEY LESSON**

**Simple data validation issues often masquerade as complex deployment problems.**
**Always validate inputs before debugging outputs.** 