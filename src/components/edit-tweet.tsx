import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { collection, deleteDoc, doc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;
const Column = styled.div``;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;
const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
`;

const EditButton = styled.button`
  background-color: dodgerblue;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function EditTweet({ username, photo, tweet, userId, id }: ITweet) {
    const user = auth.currentUser;
    const [isEdit, setIsEdit] = useState(false);
    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this tweet?");
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "tweets", id));
            if (photo) {
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        } finally {
            //
        }
    };

    return (
        <Wrapper>
            <Column>
                {user?.uid}<br />
                <Username>{username}</Username>
                <Payload>{tweet}</Payload>
                {user?.uid === userId ? (
                    <>
                        <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                        <EditButton onClick={() => setIsEdit(true)}>Edit</EditButton>
                    </>
                ) : null}
            </Column>
            {photo ? (
                <Column>
                    <Photo src={photo} />
                </Column>
            ) : null}
        </Wrapper>
    );
}