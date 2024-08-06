import { useEffect, useState } from "react";
import doc from './data/documents.json'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from "./components/Card";
import Overlay from "./components/Overlay";

function App() {
  const [documents, setDocuments] = useState(doc);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    fetch('/api/documents')
      .then((response) => response.json())
      .then((data) => setDocuments(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (changesMade) {
        saveDocuments();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [changesMade, documents]);

  const saveDocuments = () => {
    setIsSaving(true);
    fetch('/api/documents', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documents),
    })
      .then((response) => response.json())
      .then(() => {
        setIsSaving(false);
        setLastSaved(new Date());
        setChangesMade(false);
      });
  };

  const onHandleImageClick = (image) => {
    setSelectedImage(image);
  };

  const onHandleCloseOverlay = () => {
    setSelectedImage(null);
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const newDocuments = [...documents];
    const [removed] = newDocuments.splice(dragIndex, 1);
    newDocuments.splice(hoverIndex, 0, removed);
    setDocuments(newDocuments);
    setChangesMade(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="card-container">
          {documents?.map((doc, index) => (
            <Card
              key={doc.type}
              index={index}
              document={doc}
              onImageClick={onHandleImageClick}
              moveCard={moveCard}
            />
          ))}
        </div>
        {selectedImage && <Overlay image={selectedImage} onClose={onHandleCloseOverlay} />}
        {isSaving && <div className="spinner"></div>}
        {lastSaved && <h3 className="saved">Last saved: {Math.floor((new Date() - lastSaved) / 1000)} seconds ago</h3>}
      </div>
    </DndProvider>
  );
}

export default App;
