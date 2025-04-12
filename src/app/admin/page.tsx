'use client';

import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { FaTrash, FaEdit, FaEye, FaArchive, FaSignOutAlt } from 'react-icons/fa';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState('contacten');
  const [contacten, setContacten] = useState<any[]>([]);
  const [opdrachten, setOpdrachten] = useState<any[]>([]);
  const [nieuwsbrief, setNieuwsbrief] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Controleer authenticatiestatus
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchData();
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError('Ongeldige inloggegevens');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Contacten ophalen
      const contactenRef = collection(db, 'contactberichten');
      const contactenQuery = query(contactenRef, orderBy('tijdstempel', 'desc'));
      const contactenSnapshot = await getDocs(contactenQuery);
      setContacten(contactenSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      // Opdrachten ophalen
      const opdrachtenRef = collection(db, 'opdrachten');
      const opdrachtenQuery = query(opdrachtenRef, orderBy('tijdstempel', 'desc'));
      const opdrachtenSnapshot = await getDocs(opdrachtenQuery);
      setOpdrachten(opdrachtenSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      // Nieuwsbrief aanmeldingen ophalen
      const nieuwsbriefRef = collection(db, 'nieuwsbrief');
      const nieuwsbriefQuery = query(nieuwsbriefRef, orderBy('tijdstempel', 'desc'));
      const nieuwsbriefSnapshot = await getDocs(nieuwsbriefQuery);
      setNieuwsbrief(nieuwsbriefSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (collectionName: string, id: string, data: any) => {
    try {
      const itemRef = doc(db, collectionName, id);
      await updateDoc(itemRef, data);
      fetchData(); // Ververs de gegevens
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (collectionName: string, id: string) => {
    if (window.confirm('Weet je zeker dat je dit item wilt verwijderen?')) {
      try {
        const itemRef = doc(db, collectionName, id);
        await deleteDoc(itemRef);
        fetchData(); // Ververs de gegevens
        if (selectedItem?.id === id) {
          setSelectedItem(null);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const viewItem = (item: any) => {
    setSelectedItem(item);
  };

  // Render login form als gebruiker niet is ingelogd
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? 'Bezig met inloggen...' : 'Inloggen'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          <FaSignOutAlt className="mr-2" /> Uitloggen
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 ${activeTab === 'contacten' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
          onClick={() => { setActiveTab('contacten'); setSelectedItem(null); }}
        >
          Contactberichten
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'opdrachten' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
          onClick={() => { setActiveTab('opdrachten'); setSelectedItem(null); }}
        >
          Opdrachten
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'nieuwsbrief' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
          onClick={() => { setActiveTab('nieuwsbrief'); setSelectedItem(null); }}
        >
          Nieuwsbrief
        </button>
      </div>
      
      {/* Refresh knop */}
      <button 
        onClick={fetchData}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Gegevens vernieuwen
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Linker kolom - Items lijst */}
        <div className="col-span-1 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-h-screen overflow-auto">
          <h2 className="text-xl font-semibold mb-4">
            {activeTab === 'contacten' && 'Contactberichten'}
            {activeTab === 'opdrachten' && 'Opdrachten'}
            {activeTab === 'nieuwsbrief' && 'Nieuwsbrief aanmeldingen'}
          </h2>
          
          {loading ? (
            <p className="text-center py-4">Gegevens laden...</p>
          ) : (
            <ul className="space-y-2">
              {activeTab === 'contacten' && contacten.map(item => (
                <li 
                  key={item.id} 
                  className={`border-l-4 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedItem?.id === item.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                  onClick={() => viewItem(item)}
                >
                  <div className="flex justify-between">
                    <div className="font-medium">{item.naam}</div>
                    <div className="text-sm text-gray-500">{item.tijdstempel?.toDate()?.toLocaleString().split(',')[0]}</div>
                  </div>
                  <div className="text-sm">{item.onderwerp}</div>
                </li>
              ))}
              
              {activeTab === 'opdrachten' && opdrachten.map(item => (
                <li 
                  key={item.id} 
                  className={`border-l-4 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedItem?.id === item.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                  onClick={() => viewItem(item)}
                >
                  <div className="flex justify-between">
                    <div className="font-medium">{item.functietitel}</div>
                    <div className="text-sm text-gray-500">{item.tijdstempel?.toDate()?.toLocaleString().split(',')[0]}</div>
                  </div>
                  <div className="text-sm">{item.bedrijfsnaam}</div>
                </li>
              ))}
              
              {activeTab === 'nieuwsbrief' && nieuwsbrief.map(item => (
                <li 
                  key={item.id} 
                  className={`border-l-4 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedItem?.id === item.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                  onClick={() => viewItem(item)}
                >
                  <div className="flex justify-between">
                    <div className="font-medium">{item.email}</div>
                    <div className="text-sm text-gray-500">{item.tijdstempel?.toDate()?.toLocaleString().split(',')[0]}</div>
                  </div>
                </li>
              ))}
              
              {(activeTab === 'contacten' && contacten.length === 0) ||
               (activeTab === 'opdrachten' && opdrachten.length === 0) ||
               (activeTab === 'nieuwsbrief' && nieuwsbrief.length === 0) && (
                <li className="p-3 text-center text-gray-500">
                  Geen items gevonden
                </li>
              )}
            </ul>
          )}
        </div>
        
        {/* Rechter kolom - Item details */}
        <div className="col-span-2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {selectedItem ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Details</h2>
                <div className="flex space-x-2">
                  {activeTab === 'contacten' && (
                    <button
                      onClick={() => updateItem('contactberichten', selectedItem.id, { 
                        verwerkt: !selectedItem.verwerkt 
                      })}
                      className="p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      title={selectedItem.verwerkt ? "Markeer als niet verwerkt" : "Markeer als verwerkt"}
                    >
                      <FaArchive />
                    </button>
                  )}
                  {activeTab === 'opdrachten' && (
                    <button
                      onClick={() => {
                        const newStatus = selectedItem.status === 'nieuw' ? 'in behandeling' : 
                                         selectedItem.status === 'in behandeling' ? 'afgerond' : 'nieuw';
                        updateItem('opdrachten', selectedItem.id, { status: newStatus });
                      }}
                      className="p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      title="Wijzig status"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => deleteItem(
                      activeTab === 'contacten' ? 'contactberichten' : 
                      activeTab === 'opdrachten' ? 'opdrachten' : 'nieuwsbrief', 
                      selectedItem.id
                    )}
                    className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    title="Verwijderen"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                {activeTab === 'contacten' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Naam</div>
                        <div>{selectedItem.naam}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">E-mail</div>
                        <div>{selectedItem.email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Telefoonnummer</div>
                        <div>{selectedItem.telefoonnummer || '-'}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Onderwerp</div>
                      <div>{selectedItem.onderwerp}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Bericht</div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap">
                        {selectedItem.bericht}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Datum</div>
                        <div>{selectedItem.tijdstempel?.toDate()?.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Taal</div>
                        <div>{selectedItem.taal || 'nl'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs ${selectedItem.verwerkt ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {selectedItem.verwerkt ? 'Verwerkt' : 'Nieuw'}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {activeTab === 'opdrachten' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Bedrijf</div>
                        <div>{selectedItem.bedrijfsnaam}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Contactpersoon</div>
                        <div>{selectedItem.contactpersoon}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Functietitel</div>
                        <div>{selectedItem.functietitel}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">E-mail</div>
                        <div>{selectedItem.email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Telefoonnummer</div>
                        <div>{selectedItem.telefoonnummer}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Type</div>
                        <div>{selectedItem.opdrachtType}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Locatie</div>
                        <div>{selectedItem.locatie}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Werkervaring</div>
                        <div>{selectedItem.werkervaring}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Budget</div>
                        <div>{selectedItem.budget || '-'}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Startdatum</div>
                        <div>{selectedItem.startdatum}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Duur</div>
                        <div>{selectedItem.duur}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Beschrijving</div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap">
                        {selectedItem.beschrijving}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Datum</div>
                        <div>{selectedItem.tijdstempel?.toDate()?.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Taal</div>
                        <div>{selectedItem.taal || 'nl'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs 
                          ${selectedItem.status === 'nieuw' ? 'bg-yellow-100 text-yellow-800' : 
                            selectedItem.status === 'in behandeling' ? 'bg-blue-100 text-blue-800' : 
                            'bg-green-100 text-green-800'}`}
                        >
                          {selectedItem.status || 'Nieuw'}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {activeTab === 'nieuwsbrief' && (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">E-mail</div>
                      <div>{selectedItem.email}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Voorkeuren</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedItem.voorkeuren?.kandidaat && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Kandidaat</span>
                        )}
                        {selectedItem.voorkeuren?.werkgever && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Werkgever</span>
                        )}
                        {selectedItem.voorkeuren?.nieuws && (
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Nieuws</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Datum</div>
                        <div>{selectedItem.tijdstempel?.toDate()?.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Taal</div>
                        <div>{selectedItem.taal || 'nl'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs ${selectedItem.bijgewerkt ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {selectedItem.bijgewerkt ? 'Bijgewerkt' : 'Nieuw'}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Selecteer een item om de details te bekijken
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 