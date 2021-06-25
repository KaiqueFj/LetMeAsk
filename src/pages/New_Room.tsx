import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import Ilustrationimg from "../assets/images/illustration.svg";
import Logoimg from "../assets/images/logo.svg";
import { Button } from "../components/button";
import { useAuth } from "../hooks/UseHooks";

import "../styles/auth.scss";
import { database } from "../services/firebase";
import firebase from "firebase";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handlecreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const fireabaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
    history.push(`/rooms/${fireabaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={Ilustrationimg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={Logoimg} alt="Let me ask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handlecreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
