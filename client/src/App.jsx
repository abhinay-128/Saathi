import { useState ,useEffect  } from "react";

function App(){
   const [heard, setHeard] = useState("");
     const [mood, setMood] = useState("");
       const [status, setStatus] = useState("");
     const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/medicines")
      .then((res) => res.json())
      .then((data) => setMedicines(data));
  }, []);    
    const speak = () => {
    const utterance = new SpeechSynthesisUtterance("How are you feeling today?");
    utterance.lang = "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  const listen = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setHeard("Speech recognition is not supported in this browser");
      return;
    }
      const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      setHeard(event.results[0][0].transcript);
    };

        recognition.onerror = (event) => {
      setHeard("Error: " + event.error);
    };
    recognition.start();
  };  

    const save = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/checkins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          elderId: "6af842e6ac7123d0d5f5ed41",
          mood,
          note: heard,
        }),
      });
      setStatus(res.ok ? "Saved" : "Could not save");
    } catch {
      setStatus("Server not reachable");
    }
  };

  const logDose = async (medicine, doseStatus) => {
    try {
      const res = await fetch("http://localhost:5000/api/doselogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          elder: medicine.elder,
          medicine: medicine._id,
          status: doseStatus,
        }),
      });
      setStatus(res.ok ? "Dose saved" : "Could not save dose");
    } catch {
      setStatus("Server not reachable");
    }
  };

   return(
        <div>
      <h1>Saathi</h1>
      <button onClick={speak}>Ask me</button>
      <button onClick={listen}>Answer</button>
       <p>{heard}</p>
      <div>
        <button onClick={() => setMood("good")}>Good</button>
        <button onClick={() => setMood("okay")}>Okay</button>
        <button onClick={() => setMood("not well")}>Not well</button>
      </div>
      <p>Mood: {mood}</p> 

      <button onClick={save}>Save check-in</button>
      <p>{status}</p>  
      <h2>Medicines</h2>
      {medicines.map((m) => (
               <div key={m._id}>
          <p>{m.name} at {m.times.join(", ")}</p>
          <button onClick={() => logDose(m, "taken")}>Taken</button>
          <button onClick={() => logDose(m, "missed")}>Missed</button>
        </div>
      ))} 
    </div>
   );
}
export default App;