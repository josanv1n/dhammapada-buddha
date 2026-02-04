import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { DhammaWheel } from '../components/Icons';

const Contact: React.FC = () => {
  const whatsappNumber = "6281341300100"; // Clean number for API
  const whatsappDisplay = "+62-813-41-300-100";
  const email = "johan.jkt999@gmail.com";

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        
        <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden text-center shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-techno-primary/30">
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-techno-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-techno-gold/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-block p-4 rounded-full bg-slate-900 border border-techno-primary/50 mb-6 shadow-lg">
              <DhammaWheel className="w-12 h-12 text-techno-primary animate-spin-slow" />
            </div>

            <h2 className="text-3xl md:text-4xl font-techno font-bold text-white mb-2">Hubungi Kami</h2>
            <p className="text-slate-400 mb-10">Kami senang mendengar dari Anda. Silakan hubungi kami melalui saluran berikut.</p>

            <div className="space-y-6 text-left max-w-md mx-auto">
              
              {/* Email Card */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-techno-primary transition-colors group">
                <div className="p-3 rounded-full bg-slate-700 group-hover:bg-techno-primary group-hover:text-black transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Email</p>
                  <a href={`mailto:${email}`} className="text-white font-semibold hover:text-techno-primary transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-green-500 transition-colors group cursor-pointer"
              >
                <div className="p-3 rounded-full bg-slate-700 group-hover:bg-green-500 group-hover:text-black transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">WhatsApp</p>
                  <p className="text-white font-semibold">{whatsappDisplay}</p>
                  <p className="text-xs text-green-400 mt-1">Klik untuk Chat Langsung</p>
                </div>
              </a>

            </div>

             <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-slate-500 font-mono">
                    "Sabbe Satta Bhavantu Sukhitatta"<br/>
                    Semoga Semua Makhluk Berbahagia
                </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;