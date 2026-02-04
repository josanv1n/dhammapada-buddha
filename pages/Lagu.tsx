import React, { useState } from 'react';
import { LAGU_DATA } from '../data/lagu';
import { Music } from 'lucide-react';

const Lagu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = LAGU_DATA.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lyrics.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-techno font-bold text-techno-accent mb-4">Lagu Buddhis</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-techno-accent to-transparent mx-auto mb-8"></div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Cari Judul atau Lirik Lagu..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-full py-3 px-6 text-white focus:outline-none focus:border-techno-accent focus:ring-1 focus:ring-techno-accent transition-all placeholder-slate-400"
            />
            <div className="absolute right-4 top-3 text-slate-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="grid gap-8 md:grid-cols-1">
          {filteredData.length > 0 ? filteredData.map((item) => (
            <div key={item.id} className="animate-fade-in-up">
              <div className="glass-panel p-6 md:p-8 rounded-xl hover:border-techno-accent/50 transition-all duration-300 group">
                
                {/* Title */}
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                    <div className="p-3 bg-techno-accent/10 rounded-full border border-techno-accent/30 group-hover:scale-110 transition-transform duration-300">
                        <Music className="w-6 h-6 text-techno-accent" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{item.title}</h3>
                </div>

                {/* Lyrics Content */}
                <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700/50">
                    <p className="font-sans text-lg text-slate-200 leading-loose whitespace-pre-wrap text-center">
                        {item.lyrics}
                    </p>
                </div>

              </div>
            </div>
          )) : (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl">Tidak ada lagu yang ditemukan.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Lagu;