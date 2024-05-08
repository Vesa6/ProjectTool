import { set } from "mongoose";
import React, { useEffect , useState} from "react";

const ExtLinks = ({activeProjectId}) => {
    const [newLink, setNewLink] = useState("");

    const [links, setLinks] = useState([{
        id: 1,
        url: "https://www.figma.com",
    },
    {
        id: 2,
        url: "https://www.github.com",
    },
    {
        id: 3,
        url: "https://www.stackoverflow.com",
    },
    {
        id: 4,
        url: "https://www.w3schools.com",
    },
    {
        id: 5,
        url: "https://www.twitter.com",
    }]);

    // parse middle part of the url
    const parseUrl = (url) => {
        const urlArray = url.split('.');
        return urlArray[1];
    };

    const deleteLink = (id) => {
        links.splice(links.findIndex((link) => link.id === id), 1);
        setLinks([...links]);
    };

    const addLink = (url) => {
        links.push({
            id: links.length + 1,
            url: url,
        });
        setLinks([...links]);
    }; 

    useEffect(() => {
        console.log(activeProjectId);
    }, [activeProjectId]);
  return (
    <div className="flex-col bg-gray-700 text-white p-4 m-4 rounded-lg">

      <h2 className="text-xl font-bold mb-4">External links</h2>
     
      {activeProjectId ? (
        <>
        <div className="mb-2">
            <input type="text" placeholder="Add new link" className="p-2 rounded bg-gray-800 text-white" onChange={(e) => setNewLink(e.target.value)} />
            <button className="bg-green-600 text-white ml-2 px-4 py-2 rounded hover:bg-green-700 transition-colors" onClick={() => addLink(newLink)}>Add</button>
        </div>
       { links.map((links) => (
            <div
                key={links.id}
                className="p-2 mb-2 rounded bg-gray-800 flex justify-between items-center"
            >
                <div className="flex justify-between w-full">
                   
                    <a href={links.url} target="_blank" rel="noreferrer" className="text-xl underline hover:text-blue-300">{parseUrl(links.url)}</a>
                    <button className="" onClick={() => deleteLink(links.id)}>Delete</button>
                </div>
            </div>
        ))}
        </>
    ) : (
        <p>No links associated</p>
      )}
    </div>
  );
};

export default ExtLinks;
