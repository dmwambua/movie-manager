import { Client, Databases, ID, Query } from 'appwrite';
// Load environment variables and add fallback values for debugging purposes
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'undefined';
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID || 'undefined';
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'undefined';
// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Ensure this endpoint is correct
    .setProject(PROJECT_ID);
const database = new Databases(client);
// Function to update search count
export const updateSearchCount = async (searchTerm, movie) => {
    console.log('Initializing updateSearchCount...');
    console.log('DATABASE_ID:', DATABASE_ID);
    console.log('COLLECTION_ID:', COLLECTION_ID);
    console.log('PROJECT_ID:', PROJECT_ID);
    // Check if environment variables are properly loaded
    if (DATABASE_ID === 'undefined' || COLLECTION_ID === 'undefined' || PROJECT_ID === 'undefined') {
        console.error('Environment variables are not loaded correctly. Please check your .env file.');
        return;
    }
    try {
        // Use Appwrite SDK to check if the search term already exists
        console.log(`Searching for searchTerm: ${searchTerm}`);
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ]);
        if (result.documents.length > 0) {
            console.log('Search term found. Updating count...');
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
            console.log(`Updated count for searchTerm "${searchTerm}" to ${doc.count + 1}`);
        } else {
            console.log('Search term not found. Creating a new document...');
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: searchTerm.trim(),
                count: 1,
                movie_id: parseInt(movie.id), // Convert movie.id to an integer
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
            console.log(`Created new document for searchTerm "${searchTerm}" with count 1`);
        }
    } catch (error) {
        console.error('Error fetching or updating search term:', error);
    }
};
// Example call to test the function
updateSearchCount('testSearchTerm', { id: '123', poster_path: '/example.jpg' });

