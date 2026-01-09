// TestFetch.jsx
import { useEffect } from 'react';

export default function TestFetch() {
    useEffect(() => {
        const testAPI = async () => {
            console.log('Testing API connection...');
            
            try {
                // Test 1: Check if we can reach the endpoint
                const response = await fetch('/api/posts');
                console.log('Response status:', response.status);
                console.log('Response headers:', Object.fromEntries(response.headers.entries()));
                
                // Test 2: Get response as text first
                const text = await response.text();
                console.log('Raw response text:', text);
                
                // Test 3: Try to parse as JSON
                if (text) {
                    try {
                        const data = JSON.parse(text);
                        console.log('Parsed JSON:', data);
                    } catch (jsonError) {
                        console.error('Failed to parse JSON:', jsonError);
                        console.error('Response is not valid JSON:', text);
                    }
                } else {
                    console.error('Response is empty');
                }
                
            } catch (fetchError) {
                console.error('Fetch failed:', fetchError);
            }
        };
        
        testAPI();
    }, []);
    
    return <div>Testing API...</div>;
}

export {TestFetch};
