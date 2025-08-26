// Test script to debug the API
const testData = {
  title: "Test Story for Debugging",
  story: "This is a test story to debug the form submission issue. The data should appear in Google Sheets but we need to see why the frontend shows an error.",
  category: "healthcare-access",
  ageRange: "25-34",
  country: "Test Country",
  city: "Test City",
  anonymous: true,
  agreedToTerms: true
};

fetch('http://localhost:3000/api/submit-story', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData),
})
.then(response => {
  console.log('🔍 Response status:', response.status);
  console.log('🔍 Response ok:', response.ok);
  console.log('🔍 Response headers:', Object.fromEntries(response.headers.entries()));
  return response.json();
})
.then(result => {
  console.log('📄 Response result:', result);
  console.log('🧪 Success check:', result.success);
})
.catch(error => {
  console.error('❌ Fetch error:', error);
});
