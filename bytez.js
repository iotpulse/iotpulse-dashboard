import Bytez from "bytez.js";

// Your API key
const key = "b40cb089ee51d09bbb2fbc983c2a55d1";

// Initialize the SDK
const sdk = new Bytez(key);

// Select the BGE base network test model
const model = sdk.model("vchauhan0905/bge-base-network-test");

// Function to get embeddings
async function getEmbedding(text) {
  try {
    // Send input to model
    const { error, output } = await model.run(text);
    
    if (error) {
      console.error("Error:", error);
      return null;
    }
    
    console.log("Success! Embedding generated:");
    console.log({ output });
    return output;
  } catch (err) {
    console.error("Exception occurred:", err);
    return null;
  }
}

// Example usage
const exampleText = "John Smith went to London to sip lapsang souchong";
getEmbedding(exampleText);

// You can also process multiple texts
async function processMultipleTexts(texts) {
  console.log("\nProcessing multiple texts...\n");
  
  for (const text of texts) {
    console.log(`Input: ${text}`);
    await getEmbedding(text);
    console.log("---");
  }
}

// Example with multiple texts
const sampleTexts = [
  "Hello, how are you?",
  "Machine learning is fascinating",
  "The weather is nice today"
];

// Uncomment to process multiple texts
// processMultipleTexts(sampleTexts);