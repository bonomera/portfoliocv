'use client';

import { useState } from 'react';
import { logout, login, register } from '@/lib/auth';
import { postMessage, deleteMessage, getAllUsers, deleteUser } from './actions';
import Navigation from "../components/Navigation";
import './contact.css';

interface ContactClientProps {
  user: string | null;
  isAdmin: boolean;
  messages: any[];
}

export default function ContactClient({
  user,
  isAdmin,
  messages
}: ContactClientProps) {
  const [showModal, setShowModal] = useState(!user);
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  const handleOpenAdminPanel = async () => {
    if (isAdmin) {
      const users = await getAllUsers();
      setAllUsers(users);
      setShowAdminPanel(true);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (confirm('Supprimer ce message ?')) {
      await deleteMessage(messageId);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Supprimer ce compte ?')) {
      await deleteUser(userId);
    }
  };

  return (
    <>
      <div className="container">
        <Navigation />

        <section className="contact-forum">
          <h2>Forum de <span className="accent">contact</span></h2>

          {/* Bouton connexion si pas connecté */}
          {!user ? (
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <button 
                onClick={() => setShowModal(true)}
                className="cta-button"
              >
                Se connecter / S'inscrire
              </button>
            </div>
          ) : (
            <>
              {/* User Info si connecté */}
              <div className="user-info">
                <p>
                  Connecté en tant que <span className="accent">{user}</span>
                  {isAdmin && <span className="badge-admin"> [ADMIN]</span>}
                </p>
                <div className="user-actions">
                  {isAdmin && (
                    <button 
                      onClick={handleOpenAdminPanel}
                      className="btn-admin-panel"
                    >
                      Panel Admin
                    </button>
                  )}
                  <form action={logout} style={{ display: 'inline' }}>
                    <button type="submit" className="btn-logout">
                      Déconnexion
                    </button>
                  </form>
                </div>
              </div>

              {/* Message Form */}
              <form action={postMessage} className="message-form">
                <textarea
                  name="content"
                  placeholder="Écrivez votre message..."
                  required
                  className="textarea-message"
                  rows={4}
                ></textarea>
                <button type="submit" className="cta-button">
                  Envoyer le message
                </button>
              </form>
            </>
          )}

          {/* Messages List */}
          <div className="messages-container">
            <h3>Messages <span className="accent">récents</span></h3>
            {messages.length === 0 ? (
              <p className="no-messages">Aucun message pour le moment...</p>
            ) : (
              <div className="messages-list">
                {messages.map((msg) => (
                  <div key={msg.id} className="message-card">
                    <div className="message-header">
                      <p className="message-content">{msg.content}</p>
                      {user && (msg.author === user || isAdmin) && (
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="btn-delete"
                          title="Supprimer ce message"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div className="message-footer">
                      <span className="message-author">{msg.author}</span>
                      <span className="message-time">
                        {new Date(msg.createdAt).toLocaleString('fr-FR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal de connexion/inscription */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {isLoginTab ? (
              <>
                <form action={login} className="form-auth-modal">
                  <h3>Se connecter</h3>
                  <input
                    type="text"
                    name="login"
                    placeholder="Nom d'utilisateur"
                    required
                    className="input-auth"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    required
                    className="input-auth"
                  />
                  <button type="submit" className="cta-button">
                    Connexion
                  </button>
                </form>
                <button 
                  className="btn-switch-tab"
                  onClick={() => setIsLoginTab(false)}
                >
                  Pas encore inscrit ? S'inscrire
                </button>
              </>
            ) : (
              <>
                <form action={register} className="form-auth-modal">
                  <h3>S'inscrire</h3>
                  <input
                    type="text"
                    name="login"
                    placeholder="Choisir un nom d'utilisateur"
                    required
                    className="input-auth"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Choisir un mot de passe"
                    required
                    className="input-auth"
                  />
                  <button type="submit" className="cta-button">
                    Inscription
                  </button>
                </form>
                <button 
                  className="btn-switch-tab"
                  onClick={() => setIsLoginTab(true)}
                >
                  Déjà inscrit ? Se connecter
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {showAdminPanel && (
        <div className="modal-overlay" onClick={() => setShowAdminPanel(false)}>
          <div className="modal-content modal-admin" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowAdminPanel(false)}
            >
              ✕
            </button>
            <h3>Panel Admin - Gestion des comptes</h3>
            <div className="admin-users-list">
              {allUsers.map((u) => (
                <div key={u.id} className="admin-user-row">
                  <div className="admin-user-info">
                    <span className="admin-user-login">{u.login}</span>
                    <span className="admin-user-password">Password: {u.password}</span>
                    {u.isAdmin && <span className="badge-admin-small">[ADMIN]</span>}
                  </div>
                  {u.login !== 'admin' && (
                    <button 
                      onClick={() => handleDeleteUser(u.id)}
                      className="btn-delete-user"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
