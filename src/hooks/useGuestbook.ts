// ─────────────────────────────────────────────────────────────────────────────
// useGuestbook hook
// Handles reading from and writing to the Firestore 'messages' collection.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";

export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  createdAt: Timestamp | null;
  authorUid?: string;
}

export function useGuestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Authentication listener & anonymous sign in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // Sign in anonymously if not logged in
        signInAnonymously(auth).catch((err) => {
          console.error("Auth errored:", err);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time listener on 'messages' collection
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<GuestMessage, "id">),
        }));
        setMessages(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Não foi possível carregar as mensagens.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Write a new message to Firestore
  async function addMessage(name: string, message: string): Promise<void> {
    if (!name.trim() || !message.trim()) return;
    await addDoc(collection(db, "messages"), {
      name: name.trim(),
      message: message.trim(),
      createdAt: serverTimestamp(),
      authorUid: currentUser?.uid || null,
    });
  }

  // Update an existing message
  async function updateMessage(id: string, newText: string): Promise<void> {
    if (!newText.trim()) return;
    const msgRef = doc(db, "messages", id);
    await updateDoc(msgRef, {
      message: newText.trim(),
    });
  }

  // Delete a message
  async function deleteMessage(id: string): Promise<void> {
    const msgRef = doc(db, "messages", id);
    await deleteDoc(msgRef);
  }

  return { messages, loading, error, currentUser, addMessage, updateMessage, deleteMessage };
}
