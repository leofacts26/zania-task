# Document Management Application

## Overview

This project is a Document Management Application built using React.js with hooks. The application loads a set of document metadata from a static JSON file and displays them as draggable and reorderable cards. Users can click on a card to view its associated image in an overlay. The application also saves the document order to local storage and syncs it with a mock server using the Mock Service Worker (MSW).

## Features

- Display documents as draggable cards.
- Reorder cards using drag and drop.
- View document images in an overlay.
- Save document order to local storage.
- Sync data with a mock server every 5 seconds if changes are made.

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine.

### Installation

1. Clone the repository:
    ```cmd
    https://github.com/leofacts26/zania-task
    cd document-management-app
    ```

2. Install dependencies:
    ```cmd
    npm install
    ```

### Running the Application

1. Start the mock server and the React application:
    ```cmd
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

### Usage

- The application will display a set of document cards.
- Drag and drop the cards to reorder them.
- Click on a card to view the associated image in an overlay.
- The application automatically saves the document order to local storage and syncs with the mock server every 5 seconds if changes are made.

## Thought Process

### Initial Setup

The project began with creating the basic structure of a React application using `create-react-app`. The initial focus was on loading and displaying the document data from a static JSON file. React hooks were used to manage the state of the documents and the selected image for the overlay.

### Drag and Drop Functionality

To implement the drag and drop functionality, I integrated the `react-dnd` library. This required setting up `DndProvider` in the main `App` component and creating a `Card` component that could be dragged and dropped. Each card's position is managed in the state to allow reordering.

### Image Overlay

The image overlay feature was implemented using a simple state toggle. When a card is clicked, the associated image is displayed in an overlay, and pressing the ESC key or clicking outside the image closes the overlay.

### Mock Server with MSW

For the mock server, I used the Mock Service Worker (MSW) library. The handlers for GET, POST, and PUT requests were defined to interact with the local storage. This setup allowed the application to fetch, add, and update document data as if it were interacting with a real server.

### Data Persistence

Local storage was used to persist the document order across page reloads. The data is initially loaded from local storage if available, otherwise from the static JSON file. Any changes made to the document order are saved to local storage and synced with the mock server every 5 seconds, provided there are changes.

### Debugging and Error Handling

Throughout the development process, extensive use of console logging was employed to debug issues with data fetching and saving. Error handling was added to network requests to ensure robustness in case of failures.

## Conclusion

This project showcases the use of modern React features like hooks, context, and external libraries like `react-dnd` and `msw` to create a fully functional document management application. The thought process behind the implementation focused on modularity, maintainability, and user experience, ensuring that the application is both robust and easy to use.

Note:- I am not implementing backend because I am dedicated frontend Developer. 
I deployed Webapp in Vercel Here is the URL:- https://zania-dm.vercel.app/.