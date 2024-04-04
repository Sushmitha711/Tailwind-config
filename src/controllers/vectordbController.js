// Upload a file

export const UploadDocument = async (collectionName, url) => {

}
// searches through all tags, descriptions, 
export const basic_search = async() => {

}
//  Haya LLM
export const search = async (query) => { // Accept query as a parameter
    try {
        // Concatenate the query parameter with the URL string
        const url = `http://localhost:8000/knowledge-management/search?app_id=CRCL&query=${encodeURIComponent(query)}&collection_name=rag`;

        const response = await fetch(url, { // Use the constructed URL
            method: 'GET',
            mode: 'cors',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Searchdata:", data)
        return data;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null; // Or you can handle the error in a different way
    }
};


export const dummy_search = async(index) => {
    let json1;

    if(index===1){
    json1 = {
        "result": "12345678........... high-performance vector database that offers numerous benefits and features for organizations seeking efficient storage, indexing, and retrieval of high-dimensional vector data across various industries. Some key points about Qdrant include:\n\n- Qdrant can be applied to different use cases such as recommendation systems, content-based retrieval, anomaly detection, and natural language processing.\n- It enables efficient similarity search for personalized recommendations, fast retrieval of multimedia content, identification of anomalies in high-dimensional data, and semantic similarity search for text data.\n- Qdrant offers advantages like scalability, speed, versatility, ease of integration, and comprehensive feature set.\n- It scales effortlessly, delivers fast and accurate similarity searches, supports a wide range of applications, integrates well with existing systems, and benefits from an active community of users and contributors.\n- Qdrant boasts advanced indexing methods, query optimization, real-time analytics, distributed computing, integration capabilities, extensible architecture, developer-friendly APIs, and more.\n\nIn summary, Qdrant is a powerful tool that empowers organizations to leverage the benefits of vector similarity search for diverse applications with ease, speed, and scalability. \n\n| \"qdrant\" |\n|----------|\n| Qdrant   |",
        "documents": [
          {
            "payload": {
              "app_id": "CRCL",
              "collection_id": "13",
              "description": "Qdrant is versatile and can be applied to various use cases across industries, including but not limited to: Recommendation Systems: Qdrant enables efficient similarity search for personalized recommendations in e-commerce, content streaming, social networks, and other recommendation-driven platforms, enhancing user engagement and satisfaction. Content-Based Retrieval: Qdrant facilitates fast and accurate retrieval of multimedia content, such as images, videos, and documents, based on visual or semantic similarity, powering applications like image search engines, video recommendation systems, and document clustering. Anomaly Detection: Qdrant helps identify anomalies and patterns in high-dimensional data, such as network traffic, sensor readings, and financial transactions, enabling early detection of security breaches, equipment failures, and fraudulent activities, enhancing operational efficiency and risk management. Natural Language Processing: Qdrant supports semantic similarity search for text data, enabling applications like semantic search engines, document clustering, and sentiment analysis, empowering organizations to extract insights and derive value from unstructured text data.",
              "document_title": "Use Cases of Qdrant",
              "document_url": "https://www.qdrant.io/",
              "file_document_id": "1",
              "id": 4,
              "source": "url",
              "tags": [
                "Qdrant",
                "VectorDB",
                "RAG"
              ]
            },
            "score": 0.53482616
          },
          {
            "payload": {
              "app_id": "CRCL",
              "collection_id": "13",
              "description": "Qdrant offers several advantages that make it a compelling choice for organizations seeking efficient storage, indexing, and retrieval of high-dimensional vector data: Scalability: Qdrant scales effortlessly to handle growing vector datasets and user loads, leveraging distributed computing and clustering techniques for high availability and performance, enabling organizations to accommodate evolving business needs with ease. Speed: Qdrant delivers fast and accurate similarity searches, even for large-scale vector datasets, enabling real-time analytics, interactive data exploration, and rapid decision-making, enhancing operational efficiency and competitiveness. Versatility: Qdrant supports a wide range of applications, including recommendation systems, content-based retrieval, anomaly detection, and natural language processing, making it suitable for diverse use cases across industries. Ease of Integration: Integrating Qdrant into existing systems is straightforward and well-documented, minimizing development effort and time-to-market, enabling organizations to quickly leverage the benefits of vector similarity search without significant upfront investment. Community Support: Qdrant benefits from an active community of users and contributors, providing ample resources, tutorials, and forums for assistance, troubleshooting, and knowledge sharing, ensuring a smooth adoption and integration process.",
              "document_title": "Advantages of Qdrant",
              "document_url": "https://www.qdrant.io/",
              "file_document_id": "5",
              "id": 5,
              "source": "url",
              "tags": [
                "Qdrant",
                "VectorDB",
                "RAG"
              ]
            },
            "score": 0.4429977
          },
          {
            "payload": {
              "app_id": "CRCL",
              "collection_id": "13",
              "description": "Qdrant and ChromaDB are both database solutions tailored for specific types of data, but they serve different purposes and have distinct strengths and weaknesses. Here's a comparison of the two: Data Type: Qdrant is designed for efficient storage, indexing, and retrieval of high-dimensional vector data, making it suitable for applications such as recommendation systems, content-based retrieval, and anomaly detection. In contrast, ChromaDB is specialized for color data management and analysis, catering to use cases such as image processing, product design, and digital marketing. Performance: Qdrant offers fast and accurate similarity searches for high-dimensional vector data, leveraging advanced indexing techniques and distributed computing for real-time analytics and interactive data exploration. ChromaDB, on the other hand, provides specialized optimizations for color data, delivering efficient storage and retrieval of color information with fast performance and reliability. Integration: Both Qdrant and ChromaDB offer seamless integration capabilities with popular data analysis tools, programming languages, and frameworks, facilitating easy adoption and integration into existing workflows and ecosystems. However, Qdrant may have a broader range of integrations and compatibility with vector-based libraries and frameworks compared to ChromaDB, which is focused on color-centric applications. Use Cases: Qdrant and ChromaDB cater to different use cases and industries based on the type of data they handle. Qdrant is well-suited for applications such as recommendation systems, anomaly detection, and natural language processing, where vector similarity search is essential. ChromaDB, on the other hand, excels in domains like image processing, product design, and digital marketing, where color data management and analysis play a significant role. Ultimately, the choice between Qdrant and ChromaDB depends on the specific requirements and use cases of the application, with each offering unique features and advantages tailored to different types of data.",
              "document_title": "Qdrant vs. ChromaDB",
              "document_url": "https://www.qdrant.io/",
              "file_document_id": "6",
              "id": 11,
              "source": "url",
              "tags": [
                "Qdrant",
                "VectorDB",
                "RAG"
              ]
            },
            "score": 0.3818643
          }
        ],
        "similar_questions": [
          "- How does Qdrant compare to other high-performance vector databases in terms of scalability and speed?",
          "- Can you provide examples of real-world applications that have successfully implemented Qdrant for anomaly detection and natural language processing?"
        ]
      }
    }else if(index===2){
      json1 = {
        "result": "newdata........... high-performance vector database that offers numerous benefits and features for organizations seeking efficient storage, indexing, and retrieval of high-dimensional vector data across various industries. Some key points about Qdrant include:\n\n- Qdrant can be applied to different use cases such as recommendation systems, content-based retrieval, anomaly detection, and natural language processing.\n- It enables efficient similarity search for personalized recommendations, fast retrieval of multimedia content, identification of anomalies in high-dimensional data, and semantic similarity search for text data.\n- Qdrant offers advantages like scalability, speed, versatility, ease of integration, and comprehensive feature set.\n- It scales effortlessly, delivers fast and accurate similarity searches, supports a wide range of applications, integrates well with existing systems, and benefits from an active community of users and contributors.\n- Qdrant boasts advanced indexing methods, query optimization, real-time analytics, distributed computing, integration capabilities, extensible architecture, developer-friendly APIs, and more.\n\nIn summary, Qdrant is a powerful tool that empowers organizations to leverage the benefits of vector similarity search for diverse applications with ease, speed, and scalability. \n\n| \"qdrant\" |\n|----------|\n| Qdrant   |",
        "documents": [
          {
            "payload": {
              "app_id": "CRCL",
              "collection_id": "13",
              "description": "Qdrant is versatile and can be applied to various use cases across industries, including but not limited to: Recommendation Systems: Qdrant enables efficient similarity search for personalized recommendations in e-commerce, content streaming, social networks, and other recommendation-driven platforms, enhancing user engagement and satisfaction. Content-Based Retrieval: Qdrant facilitates fast and accurate retrieval of multimedia content, such as images, videos, and documents, based on visual or semantic similarity, powering applications like image search engines, video recommendation systems, and document clustering. Anomaly Detection: Qdrant helps identify anomalies and patterns in high-dimensional data, such as network traffic, sensor readings, and financial transactions, enabling early detection of security breaches, equipment failures, and fraudulent activities, enhancing operational efficiency and risk management. Natural Language Processing: Qdrant supports semantic similarity search for text data, enabling applications like semantic search engines, document clustering, and sentiment analysis, empowering organizations to extract insights and derive value from unstructured text data.",
              "document_title": "Use Cases of Qdrant",
              "document_url": "https://www.qdrant.io/",
              "file_document_id": "1",
              "id": 4,
              "source": "url",
              "tags": [
                "Qdrant",
                "VectorDB",
                "RAG"
              ]
            },
            "score": 0.53482616
          },
          {
            "payload": {
              "app_id": "CRCL",
              "collection_id": "13",
              "description": "Qdrant offers several advantages that make it a compelling choice for organizations seeking efficient storage, indexing, and retrieval of high-dimensional vector data: Scalability: Qdrant scales effortlessly to handle growing vector datasets and user loads, leveraging distributed computing and clustering techniques for high availability and performance, enabling organizations to accommodate evolving business needs with ease. Speed: Qdrant delivers fast and accurate similarity searches, even for large-scale vector datasets, enabling real-time analytics, interactive data exploration, and rapid decision-making, enhancing operational efficiency and competitiveness. Versatility: Qdrant supports a wide range of applications, including recommendation systems, content-based retrieval, anomaly detection, and natural language processing, making it suitable for diverse use cases across industries. Ease of Integration: Integrating Qdrant into existing systems is straightforward and well-documented, minimizing development effort and time-to-market, enabling organizations to quickly leverage the benefits of vector similarity search without significant upfront investment. Community Support: Qdrant benefits from an active community of users and contributors, providing ample resources, tutorials, and forums for assistance, troubleshooting, and knowledge sharing, ensuring a smooth adoption and integration process.",
              "document_title": "Advantages of Qdrant",
              "document_url": "https://www.qdrant.io/",
              "file_document_id": "5",
              "id": 5,
              "source": "url",
              "tags": [
                "Qdrant",
                "VectorDB",
                "RAG"
              ]
            },
            "score": 0.4429977
          },
          {
            "payload": {
              "app_id": "CRCL",
              "collection_id": "13",
              "description": "Qdrant and ChromaDB are both database solutions tailored for specific types of data, but they serve different purposes and have distinct strengths and weaknesses. Here's a comparison of the two: Data Type: Qdrant is designed for efficient storage, indexing, and retrieval of high-dimensional vector data, making it suitable for applications such as recommendation systems, content-based retrieval, and anomaly detection. In contrast, ChromaDB is specialized for color data management and analysis, catering to use cases such as image processing, product design, and digital marketing. Performance: Qdrant offers fast and accurate similarity searches for high-dimensional vector data, leveraging advanced indexing techniques and distributed computing for real-time analytics and interactive data exploration. ChromaDB, on the other hand, provides specialized optimizations for color data, delivering efficient storage and retrieval of color information with fast performance and reliability. Integration: Both Qdrant and ChromaDB offer seamless integration capabilities with popular data analysis tools, programming languages, and frameworks, facilitating easy adoption and integration into existing workflows and ecosystems. However, Qdrant may have a broader range of integrations and compatibility with vector-based libraries and frameworks compared to ChromaDB, which is focused on color-centric applications. Use Cases: Qdrant and ChromaDB cater to different use cases and industries based on the type of data they handle. Qdrant is well-suited for applications such as recommendation systems, anomaly detection, and natural language processing, where vector similarity search is essential. ChromaDB, on the other hand, excels in domains like image processing, product design, and digital marketing, where color data management and analysis play a significant role. Ultimately, the choice between Qdrant and ChromaDB depends on the specific requirements and use cases of the application, with each offering unique features and advantages tailored to different types of data.",
              "document_title": "Qdrant vs. ChromaDB",
              "document_url": "https://www.qdrant.io/",
              "file_document_id": "6",
              "id": 11,
              "source": "url",
              "tags": [
                "Qdrant",
                "VectorDB",
                "RAG"
              ]
            },
            "score": 0.3818643
          }
        ],
        "similar_questions": [
          "- How does Qdrant compare to other high-performance vector databases in terms of scalability and speed?",
          "- Can you provide examples of real-world applications that have successfully implemented Qdrant for anomaly detection and natural language processing?"
        ]
      }
    }

      return json1
}

export const tag_generation = async () => {

}

export const follow_up = async () => {

}


export const get_trash = async () => {

}

export const delete_document = async () => {

}

export const permanent_delete_document = async () => {

}

export const get_archive_ = async () => {

}

export const archive_docuemnt = async () => {

}