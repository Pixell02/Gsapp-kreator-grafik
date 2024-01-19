import { getFunctions, httpsCallable } from "firebase/functions";
import React, { useState } from "react";

const Mailing = () => {
  const [mail, setMail] = useState({
    subject: "",
    text: "",
    to: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const functions = getFunctions();
  const newsletter = httpsCallable(functions, "newsletter");
  const handleSend = async () => {
    const response = await newsletter({ ...mail });
    if (response?.data) {
      setMessage(response.data as string);
    }
  };

  return (
    <div className="d-flex flex-column w-50">
      <label>Temat</label>
      <input
        value={mail.subject}
        onChange={(e) => setMail({ ...mail, [e.target.className]: e.target.value })}
        className="subject"
      />
      <label>Do</label>
      <input
        value={mail.to}
        onChange={(e) => setMail({ ...mail, [e.target.className]: e.target.value })}
        className="to"
      />
      * puste pole oznacza do wszystkich
      <label>Treść</label>
      <textarea
        value={mail.text}
        onChange={(e) => setMail({ ...mail, [e.target.className]: e.target.value })}
        className="text"
      />
      <button className="btn" onClick={handleSend}>
        Wyślij
      </button>
      {message && <span>{message}</span>}
    </div>
  );
};

export default Mailing;
