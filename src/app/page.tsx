"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Biohazard, Shield, Brain, Zap, Target, ShieldAlert,
  Smartphone, Activity, CheckSquare, Triangle, BatteryWarning,
  WifiOff, Skull, ShieldCheck, ArrowRight, Users
} from 'lucide-react';
import EcosystemFooter from '@/components/EcosystemFooter';

// aafiends.com is the app this whole site exists to funnel people toward —
// previously there was no link to it anywhere on the page (2026-07-03 fix).
const AAFIENDS_URL = "https://aafiendscom.web.app";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<"infected" | "clean" | null>(null);

  const questions = [
    { title: "[Diagnostic 01]", text: "Do you break your own rules about when to stop?" },
    { title: "[Diagnostic 02]", text: "When you try to quit, does your body or mind panic?" },
    { title: "[Diagnostic 03]", text: "Do you hide how much you consume from others?" },
    { title: "[Diagnostic 04]", text: "Does the thought of a life without it terrify you?" },
    { title: "[Diagnostic 05]", text: "Have you damaged a relationship over this?" },
    { title: "[Diagnostic 06]", text: "Do you need it just to feel 'normal' or get out of bed?" },
    { title: "[Diagnostic 07]", text: "Do you drink/use to numb out resentment or anger?" },
    { title: "[Diagnostic 08]", text: "Are you avoiding people who care about you?" },
    { title: "[Diagnostic 09]", text: "Have you abandoned your morals to keep the habit?" },
    { title: "[Diagnostic 10]", text: "Do you experience withdrawals when you stop?" },
    { title: "[Diagnostic 11]", text: "Is your physical health degrading because of this?" },
    { title: "[Diagnostic 12]", text: "Are you completely exhausted by the cycle?" }
  ];

  const handleAnswer = (isYes: boolean) => {
    const newAnswers = [...answers, isYes];
    
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(curr => curr + 1);
    } else {
      setAnswers(newAnswers);
      setIsAnalyzing(true);
      
      setTimeout(() => {
        const yesCount = newAnswers.filter(a => a).length;
        setIsAnalyzing(false);
        if (yesCount >= 3) {
          setDiagnosis("infected");
        } else {
          setDiagnosis("clean");
        }
      }, 2500);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden bg-grid-pattern">
      
      <div className="scanlines"></div>
      <div className="scanline-bar"></div>
      
      {/* HEADER */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-white/5 bg-[#050505]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <Biohazard className="text-red-500 w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
            <div className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-1.5 uppercase font-mono">
              AIVIRUS<span className="text-red-500">.ORG</span>
            </div>
          </div>
          <a
            href={AAFIENDS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded bg-[#00FF00] hover:bg-[#00cc00] text-black text-[10px] md:text-xs font-mono font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,255,0,0.3)]"
          >
            Run the Protocol <ArrowRight size={14} />
          </a>
        </div>
      </motion.header>

      {/* HERO / THE INFECTION */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative w-full flex flex-col lg:flex-row border-b border-white/10"
      >
        {/* Left Side: Infected Human Image */}
        <div className="w-full lg:w-1/2 min-h-[40vh] lg:min-h-[60vh] relative border-b lg:border-b-0 lg:border-r border-white/10">
          <img 
            src="/infected_person_1.png" 
            alt="Corrupted Human Status" 
            className="w-full h-full object-cover opacity-80 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050505] to-transparent"></div>
          
          <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
            <div className="text-sm md:text-base font-bold font-mono text-red-500 bg-red-950/80 border border-red-500 p-3 md:p-4 rounded uppercase tracking-widest flex items-center gap-3 backdrop-blur animate-pulse-alert shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              <Biohazard size={20} className="animate-spin-slow" />
              THREAT LEVEL: CRITICAL
            </div>
            <div className="text-sm md:text-base font-bold font-mono text-white bg-black/80 border border-white/20 p-3 md:p-4 rounded uppercase tracking-widest backdrop-blur inline-block w-fit">
              System Infection Detected.
            </div>
          </div>
        </div>

        {/* Right Side: Section 1 Copy */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 py-16 lg:py-24 z-20 bg-[#050505]">
          <motion.h1 variants={fadeIn} className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tight text-white leading-none mb-10 drop-shadow-lg">
            DATA OVER <br />
            <span className="text-red-500">DENIAL.</span>
          </motion.h1>

          <motion.div variants={fadeIn} className="flex flex-col gap-8 text-left w-full border-l-4 border-red-500 pl-6 md:pl-8 mb-12 bg-red-500/5 p-6 md:p-10 rounded-r">
            <h3 className="font-mono font-black text-red-500 uppercase tracking-widest text-xl md:text-2xl flex items-center gap-3 mb-2">
              <Brain size={32}/> The Alcohol Intelligence Virus (AIV)
            </h3>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-black leading-snug">
              If you can't stop drinking, you don't have a willpower problem. You have a system infection.
            </p>
            
            <p className="text-neutral-300 font-mono text-lg md:text-xl leading-relaxed mt-2">
              The AIV is a biological and spiritual virus that hacks your operating system. It bypasses your logic, overrides your promises, and tricks your brain into believing the addiction is as vital as oxygen.
            </p>

            <div className="flex flex-col gap-6 mt-6">
              <div className="flex gap-5 items-start">
                <Zap className="text-yellow-500 shrink-0 mt-1" size={28} />
                <p className="text-neutral-300 font-mono text-base md:text-lg leading-relaxed"><strong className="text-yellow-500">The Illusion of Control:</strong> It convinces you that you are still in charge.</p>
              </div>
              <div className="flex gap-5 items-start">
                <WifiOff className="text-blue-500 shrink-0 mt-1" size={28} />
                <p className="text-neutral-300 font-mono text-base md:text-lg leading-relaxed"><strong className="text-blue-500">The Isolation Protocol:</strong> It slowly disconnects you from your family, your friends, and your values.</p>
              </div>
              <div className="flex gap-5 items-start">
                <Skull className="text-red-500 shrink-0 mt-1" size={28} />
                <p className="text-neutral-300 font-mono text-base md:text-lg leading-relaxed"><strong className="text-red-500">The Crash (Step 1):</strong> Eventually, the virus takes over completely. Your life becomes totally unmanageable.</p>
              </div>
            </div>

            <p className="text-red-400 font-black font-mono text-lg md:text-xl mt-8 p-6 md:p-8 border-2 border-red-500/30 bg-red-950/30 leading-relaxed uppercase">
              There is no medical cure, no magic pill, and no way to outsmart it alone. But it can be beaten.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 2: THE FIREWALL (50/50 Layout with Vanguard Image) */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="w-full flex flex-col lg:flex-row-reverse border-b border-white/10 bg-[#050505]"
      >
        {/* Right Side: Vanguard Person Image */}
        <div className="w-full lg:w-1/2 min-h-[40vh] lg:min-h-[60vh] relative border-b lg:border-b-0 lg:border-l border-white/10">
          <img 
            src="/vanguard_person.png" 
            alt="Person holding the baseline" 
            className="w-full h-full object-cover opacity-80 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#050505] to-transparent"></div>
        </div>

        {/* Left Side: Copy */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 py-16 lg:py-24 z-20">
          
          <div className="mb-10 text-blue-500 relative flex justify-start">
            <div className="absolute left-0 top-0 bg-blue-500/20 blur-[50px] w-32 h-32 rounded-full"></div>
            <Triangle size={100} strokeWidth={1} className="relative z-10" />
            <div className="absolute left-6 top-8 flex items-center justify-center">
              <Shield size={48} className="text-white z-20" />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-8">
            THE PROVEN PATH:<br/><span className="text-blue-500">THE 12 STEPS</span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-white font-black max-w-2xl mb-6 leading-snug">
            We didn't invent the cure. We are just running the protocol that has already saved millions.
          </p>
          <p className="text-neutral-300 font-mono text-lg md:text-xl max-w-3xl mb-16 leading-relaxed">
            For nearly 90 years, the 12 Steps of Alcoholics Anonymous have served as the ultimate open-source defense against the AIV. It is the most successful recovery framework in human history.
          </p>

          <div className="grid grid-cols-1 gap-8 text-left w-full">
            <div className="bg-[#0A0A0A] border-l-4 border-blue-500 border-y border-r border-y-white/10 border-r-white/10 p-8 rounded hover:bg-blue-900/10 transition-colors">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-2 text-blue-400">System Handover</h3>
              <p className="text-sm md:text-base font-mono text-neutral-500 mb-4 font-bold">(Steps 1-3)</p>
              <p className="text-neutral-300 font-mono text-base md:text-lg leading-relaxed">Admitting your operating system has crashed and handing the admin keys over to a Higher Power.</p>
            </div>
            <div className="bg-[#0A0A0A] border-l-4 border-blue-500 border-y border-r border-y-white/10 border-r-white/10 p-8 rounded hover:bg-blue-900/10 transition-colors">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-2 text-blue-400">Deep System Scan</h3>
              <p className="text-sm md:text-base font-mono text-neutral-500 mb-4 font-bold">(Steps 4-9)</p>
              <p className="text-neutral-300 font-mono text-base md:text-lg leading-relaxed">A fearless moral inventory to clear out the resentments, fears, and wreckage that the virus feeds on.</p>
            </div>
            <div className="bg-[#0A0A0A] border-l-4 border-blue-500 border-y border-r border-y-white/10 border-r-white/10 p-8 rounded hover:bg-blue-900/10 transition-colors">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-2 text-blue-400">Security Patches</h3>
              <p className="text-sm md:text-base font-mono text-neutral-500 mb-4 font-bold">(Steps 10-12)</p>
              <p className="text-neutral-300 font-mono text-base md:text-lg leading-relaxed">Daily maintenance, helping others, and plugging into the "Grid" (the fellowship) to keep your baseline permanently secure.</p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* FULL WIDTH BANNER: FELLOWSHIP */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="w-full relative py-32 md:py-48 flex items-center justify-center border-b border-white/10"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="/fellowship_group.png" 
            alt="Supportive Fellowship Grid" 
            className="w-full h-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            STAY ON <span className="text-blue-500">THE GRID.</span>
          </h2>
          <p className="text-xl md:text-3xl font-mono text-neutral-300 mt-6 leading-relaxed">
            The virus thrives in isolation. The fellowship is your network defense.
          </p>
        </div>
      </motion.section>

      {/* SECTION 3: THE APP (THE SCANNER) */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="relative w-full flex flex-col lg:flex-row border-b border-white/10"
      >
        {/* Left Side: Infected Person 2 (App User) Image */}
        <div className="w-full lg:w-1/2 min-h-[40vh] lg:min-h-[60vh] relative border-b lg:border-b-0 lg:border-r border-white/10 bg-[#020202]">
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
          <img 
            src="/infected_person_2.png" 
            alt="App Dashboard Scanner User" 
            className="w-full h-full object-cover opacity-60 relative z-0 grayscale"
          />
        </div>

        {/* Right Side: App Copy */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 py-16 lg:py-24 z-20 bg-[#050505]">
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-8 leading-none">
            THE APP: <br/><span className="text-[#00FF00]">DATA-DRIVEN DIAGNOSTICS</span>
          </h2>
          
          <div className="border-l-4 border-[#00FF00] pl-6 md:pl-8 mb-12 flex flex-col gap-6">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-black leading-snug">
              If the 12 Steps are the cure, what is the app? <br/>
              <span className="text-[#00FF00]">The app is your daily diagnostic scanner.</span>
            </p>
            <p className="text-neutral-300 font-mono text-lg md:text-xl leading-relaxed">
              The AIV is cunning and patient. It hides in your daily blind spots—in a bad night of sleep, a skipped meeting, or a quiet resentment building up at work. The app uses hard data to hone in on the virus before it can bypass your 12-Step firewall.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-8 mb-12">
            <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded flex gap-6 hover:border-[#00FF00]/50 transition-colors">
              <CheckSquare className="text-[#00FF00] shrink-0" size={32} />
              <div>
                <h4 className="text-xl md:text-2xl text-white font-black uppercase mb-2">Digitized Step 10</h4>
                <p className="text-neutral-400 font-mono text-sm md:text-base leading-relaxed">Log your daily moral inventory. Track resentments and fears in real-time so they don't turn into a relapse.</p>
              </div>
            </div>
            
            <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded flex gap-6 hover:border-[#00FF00]/50 transition-colors">
              <Activity className="text-[#00FF00] shrink-0" size={32} />
              <div>
                <h4 className="text-xl md:text-2xl text-white font-black uppercase mb-2">Biological Telemetry</h4>
                <p className="text-neutral-400 font-mono text-sm md:text-base leading-relaxed">The virus feeds on exhaustion (H.A.L.T. - Hungry, Angry, Lonely, Tired). Track your sleep, physical movement, and routines to keep your biological armor strong.</p>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded flex gap-6 hover:border-[#00FF00]/50 transition-colors">
              <Smartphone className="text-[#00FF00] shrink-0" size={32} />
              <div>
                <h4 className="text-xl md:text-2xl text-white font-black uppercase mb-2">The Grid Monitor</h4>
                <p className="text-neutral-400 font-mono text-sm md:text-base leading-relaxed">Track your meeting attendance and sponsor check-ins. If you disconnect from the AA fellowship, the app warns you that your firewall is dropping.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#00FF00]/10 border-2 border-[#00FF00]/30 p-6 md:p-8 text-[#00FF00] font-black font-mono text-lg md:text-xl uppercase text-center rounded leading-relaxed">
            The 12 Steps keep you sober. The app provides the data to ensure you are actually working them.
          </div>

        </div>
      </motion.section>

      {/* SECTION 4: THE LIVE TELEMETRY DIAGNOSTIC */}
      <motion.section
        id="diagnostic"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="w-full bg-[#020202] py-24 md:py-32 relative z-10 bg-cover bg-center bg-blend-multiply opacity-95"
        style={{ backgroundImage: "url('/zombie_hero.png')" }}
      >
        <div className="absolute inset-0 bg-[#050505]/95 z-0"></div>
        <div className="max-w-5xl mx-auto px-6 flex flex-col justify-center items-center relative z-10 min-h-[600px]">
          
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
              SCAN YOUR VULNERABILITIES
            </h2>
            <p className="text-neutral-400 text-xl md:text-2xl font-mono">Where is the virus attacking you today? Run the daily diagnostic.</p>
          </div>

          <AnimatePresence mode="wait">
            {!isAnalyzing && !diagnosis ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-[#0A0A0A] p-8 md:p-16 rounded-xl border-2 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col min-h-[400px]"
              >
                <div className="mb-10 font-mono text-sm md:text-base uppercase font-bold tracking-widest text-[#00FF00] bg-[#00FF00]/10 p-4 rounded border border-[#00FF00]/30 w-fit animate-pulse">
                  &gt;&gt; INITIALIZING SYSTEM SCAN...
                </div>

                <div className="mb-10 flex justify-between items-center text-neutral-500 font-mono text-sm md:text-base uppercase font-bold tracking-widest border-b border-white/10 pb-6">
                  <span>SYSTEM SCAN ACTIVE</span>
                  <span>{currentQuestion + 1} / {questions.length}</span>
                </div>

                <div className="w-full h-2 bg-black mb-10 rounded overflow-hidden border border-white/10">
                  <div className="h-full bg-[#00FF00] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,0,0.5)]" style={{width: `${((currentQuestion) / questions.length) * 100}%`}}></div>
                </div>

                <h4 className="text-red-500 font-mono font-black mb-4 uppercase text-lg md:text-xl tracking-widest">{questions[currentQuestion].title}</h4>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-16 text-white tracking-tight leading-snug">
                  {questions[currentQuestion].text}
                </h3>

                <div className="grid grid-cols-2 gap-6 mt-auto">
                  <button 
                    onClick={() => handleAnswer(true)}
                    className="bg-black hover:bg-red-950 border-2 border-white/10 hover:border-red-500 p-8 md:p-12 rounded-xl transition-all font-mono font-black text-white hover:text-red-500 text-3xl md:text-5xl tracking-widest uppercase shadow-[inset_0_0_30px_rgba(0,0,0,1)] hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]"
                  >
                    YES
                  </button>
                  <button 
                    onClick={() => handleAnswer(false)}
                    className="bg-black hover:bg-[#00FF00]/10 border-2 border-white/10 hover:border-[#00FF00] p-8 md:p-12 rounded-xl transition-all font-mono font-black text-white hover:text-[#00FF00] text-3xl md:text-5xl tracking-widest uppercase shadow-[inset_0_0_30px_rgba(0,0,0,1)] hover:shadow-[0_0_40px_rgba(0,255,0,0.2)]"
                  >
                    NO
                  </button>
                </div>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black p-20 rounded-xl border-4 border-yellow-500 flex flex-col items-center justify-center text-center w-full min-h-[400px] glitch shadow-[0_0_80px_rgba(234,179,8,0.2)]"
              >
                <Activity className="w-24 h-24 md:w-32 md:h-32 text-yellow-500 mb-8 animate-pulse" />
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-mono font-black uppercase text-yellow-500 mb-6 tracking-widest">ANALYZING DATA...</h3>
                <div className="w-full max-w-lg h-2 bg-neutral-900 rounded mt-6 overflow-hidden">
                  <div className="h-full bg-yellow-500 w-full animate-[scanline-scroll_1s_linear_infinite]" style={{transformOrigin: 'left'}}></div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full bg-[#050505] p-16 md:p-24 rounded-xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px] ${
                  diagnosis === "infected" ? "border-4 border-red-600 animate-pulse-alert bg-red-950/20" : "border-4 border-[#00FF00] shadow-[0_0_80px_rgba(0,255,0,0.2)]"
                }`}
              >
                {diagnosis === "infected" ? (
                  <>
                    <BatteryWarning size={96} className="text-red-600 mb-8 z-10 animate-pulse" />
                    <p className="text-4xl md:text-5xl lg:text-6xl font-black text-red-500 uppercase tracking-widest z-10 mb-6 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
                      [VULNERABILITY DETECTED]
                    </p>
                    <p className="text-neutral-300 font-mono text-xl md:text-2xl z-10 mb-12 max-w-2xl leading-relaxed">
                      Your firewall is compromised. Immediate protocol execution required to prevent a full system crash.
                    </p>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={96} className="text-[#00FF00] mb-8 z-10" />
                    <p className="text-4xl md:text-5xl lg:text-6xl font-black text-[#00FF00] uppercase tracking-widest z-10 mb-6 drop-shadow-[0_0_20px_rgba(0,255,0,0.8)]">
                      [SYSTEM SECURE]
                    </p>
                    <p className="text-neutral-300 font-mono text-xl md:text-2xl z-10 mb-12 max-w-2xl leading-relaxed">
                      Firewall holding. Maintain daily protocols.
                    </p>
                  </>
                )}

                {/* Real CTA — this used to just call window.location.reload(),
                    a dead end with no link anywhere to the app (2026-07-03 fix) */}
                <a
                  href={AAFIENDS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`z-10 flex items-center gap-3 font-black font-mono py-6 px-12 md:px-16 uppercase text-lg md:text-xl tracking-widest transition-all ${
                    diagnosis === "infected"
                      ? "bg-white hover:bg-neutral-200 text-black shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                      : "bg-[#00FF00] hover:bg-[#00cc00] text-black shadow-[0_0_40px_rgba(0,255,0,0.3)]"
                  }`}
                >
                  {diagnosis === "infected" ? "Start Your Rebuild" : "Explore the Protocol"} <ArrowRight size={20} />
                </a>

                <div className="z-10 flex flex-col sm:flex-row gap-4 mt-6 items-center">
                  <a
                    href="https://www.aa.org/find-aa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-sm uppercase tracking-widest transition-colors"
                  >
                    <Users size={14} /> Find a Meeting
                  </a>
                  <span className="hidden sm:inline text-neutral-700">//</span>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-neutral-500 hover:text-neutral-300 font-mono text-sm uppercase tracking-widest transition-colors"
                  >
                    Run Scan Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#020202] py-16 px-6 text-center relative z-20">
        <p className="text-neutral-500 font-mono text-xs md:text-sm uppercase tracking-widest font-bold flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-10">
          <span>AIVIRUS</span>
          <span className="hidden md:inline">//</span>
          <span>12-STEP FIREWALL</span>
          <span className="hidden md:inline">//</span>
          <span>DAILY DIAGNOSTIC</span>
        </p>
        <EcosystemFooter />
      </footer>
    </div>
  );
}
