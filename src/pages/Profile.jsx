import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Activity, MessageSquare } from "lucide-react";

const ProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const q = query(
        collection(db, "conversations"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setConversations(data);
    };
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0F172A] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#1E293B] border border-cyan-500/20 rounded-3xl p-8 shadow-lg shadow-cyan-500/10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-md shadow-cyan-500/30">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Your Profile</h1>
        </div>

        {user ? (
          <div className="mb-10">
            <p className="text-gray-300"><strong>Email:</strong> {user.email || "Anonymous"}</p>
            <p className="text-gray-300"><strong>User ID:</strong> {user.uid}</p>
          </div>
        ) : (
          <p className="text-gray-400">Not logged in.</p>
        )}

        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Your Conversations</h2>
        {conversations.length === 0 ? (
          <p className="text-gray-400">No conversations yet.</p>
        ) : (
          <div className="space-y-4">
            {conversations.map((conv, i) => (
              <div
                key={i}
                className="p-4 bg-[#0F172A] border border-cyan-500/20 rounded-xl hover:border-cyan-400/40 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-400">
                    {new Date(conv.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-200"><strong>You:</strong> {conv.message}</p>
                <p className="text-cyan-300 mt-2"><strong>AI:</strong> {conv.response}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
