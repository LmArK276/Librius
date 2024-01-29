const axios = require("axios");

const apiKey =  "AIzaSyDBZrsCrJi8h4ek1x48L3hs0XeA3rWpphs"
const apiBase =  "https://www.googleapis.com/books/v1/volumes"



var getPopularBooks = async function(){

    const params = {
        q: "subject:popular",
        orderBy: "relevance",
        maxResults: 8,
        key: config.apiKey,
      };

    const response = await axios.get(apiBase, { params })
    const data = response.data;

    if (data.items) {
        var popularBooks = data.items;
        return data
    } else {
        console.log("No popular books found.");
        return [];
    }
}

var getBooksPage = async function(pageNum, genre, searchKeyword = "none", searchFlag = false)
{
    
    var query = "subject:"+genre

    if(searchFlag)
    {
        query = "intitle:"+searchKeyword
    }

    console.log(query)

    const params = {
        q: query,
        maxResults: 8,
        orderBy:"relevance",
        startIndex: (pageNum - 1) * 8,
        key: apiKey
    };

    const response = await axios.get(apiBase, {params})
    const data = response.data

    if (data.items) {
        var booksPage = data.items;
     
        var selectedFields = booksPage.map(item =>{
            return {
                id: item.id,
                title: item.volumeInfo.title,
                description: item.volumeInfo.description ? item.volumeInfo.description : "No description provided",
                images: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks : [],
                authors : item.volumeInfo.authors ? item.volumeInfo.authors : []
            }
        })

        return {
            totalItems: data.totalItems,
            books: selectedFields
        }
    } else {
        console.log("No books found for this page in pagination");
        return [];
    }

}

var getSingleBook = async function(bookID)
{
    var response = await axios.get(apiBase+"/"+bookID+"?key="+apiKey)

    const item = response.data;

    const bookDetails = {
        id: bookID,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors ? item.volumeInfo.authors : [],
        publishedDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description ? item.volumeInfo.description : "No description provided",
        coverImage: item.volumeInfo.imageLinks?.thumbnail || '',
        pageCount: item.volumeInfo.pageCount,
    };

    return bookDetails

}

var getFavoriteBooks = async function(bookIDs) {
    const maxBackoffTime = 5000; // Maximum backoff time (5 seconds)
  
    var favoriteBooksPromises = bookIDs.map(async bookID => {
      let backoffTime = 1000; // Initial backoff time (1 second)
      while (true) {
        try {
          return await getSingleBook(bookID);
        } catch (error) {
          if (error.response && error.response.status === 429) {
            console.warn(`Rate limit exceeded for book ID ${bookID}. Retrying after ${backoffTime}ms...`);
            await new Promise(resolve => setTimeout(resolve, backoffTime));
            backoffTime *= 2; // Double the backoff time for the next retry
            backoffTime = Math.min(backoffTime, maxBackoffTime); // Cap the backoff time
          } else {
            console.error(`Error fetching book details for ID ${bookID}:`, error);
            throw error;
          }
        }
      }
    });
  
    try {
      var favoriteBooks = await Promise.all(favoriteBooksPromises);
      return favoriteBooks;
    } catch (error) {
      console.error("Error fetching favorite books:", error);
      throw error;
    }
  }

module.exports = {
    getPopularBooks,
    getBooksPage,
    getSingleBook,
    getFavoriteBooks
}