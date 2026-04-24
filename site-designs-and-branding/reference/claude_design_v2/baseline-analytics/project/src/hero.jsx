// Editorial hero — investor-letter opener
const { useEffect: useEffectHero, useState: useStateHero } = React;

function Hero({ cycle, stakeholder }){
  const [mounted, setMounted] = useStateHero(false);
  const [now, setNow] = useStateHero(new Date());
  useEffectHero(()=>{ setMounted(true); const t=setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(t); },[]);

  const hhmm = now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false});
  const ss   = now.toLocaleTimeString('en-US',{second:'2-digit',hour12:false});

  return (
    <section style={{position:"relative", padding:"88px 0 56px", borderBottom:"1px solid var(--line-2)", overflow:"hidden"}}>
      {/* animated pattern */}
      <div style={{position:"absolute", inset:0, opacity:0.85}}>
        <LinesPattern height={560} density={78} opacity={0.11} animated seed={11}/>
        {/* soft radial wash */}
        <div style={{position:"absolute",inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,198,85,0.08), transparent 70%)"}}/>
      </div>

      {/* top meta row */}
      <div style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:56}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:"var(--gold)",animation:"pulseDot 2s ease-in-out infinite"}}/>
          <span className="mono" style={{fontSize:10,color:"var(--gold)",letterSpacing:"0.22em"}}>CYCLE IN PROGRESS</span>
        </div>
        <div className="mono tnum" style={{fontSize:10,color:"var(--t2)",letterSpacing:"0.14em",textAlign:"right"}}>
          <div>PREPARED FOR / <span style={{color:"var(--gold)"}}>{stakeholder.toUpperCase()}</span></div>
          <div style={{marginTop:4,color:"var(--t3)"}}>CLASSIFICATION / <span style={{color:"var(--t2)"}}>CONFIDENTIAL</span></div>
        </div>
      </div>

      {/* cycle tape */}
      <div style={{position:"relative",display:"flex",alignItems:"center",gap:18, marginBottom:36}}>
        <span className="mono" style={{fontSize:11,color:"var(--gold-m)",letterSpacing:"0.26em"}}>CURRENT CYCLE</span>
        <div style={{flex:1, height:1, background:"linear-gradient(90deg, var(--gold) 0%, var(--gold) 40%, rgba(255,198,85,0.2) 100%)"}}/>
        <span className="mono tnum" style={{fontSize:13, color:"var(--gold)", letterSpacing:"0.08em", fontWeight:500}}>{cycle.toUpperCase()}</span>
      </div>

      {/* Headline — editorial, serif */}
      <h1 className="serif" style={{
        fontSize:"clamp(56px, 8vw, 112px)",
        fontWeight:300,
        letterSpacing:"-0.035em",
        lineHeight:0.98,
        margin:"0 0 28px",
        color:"var(--t1)",
        position:"relative",
        textWrap:"balance",
        opacity: mounted? 1: 0,
        transform: mounted? "translateY(0)":"translateY(12px)",
        transition:"opacity .9s ease, transform .9s ease"
      }}>
        Inside the <em className="serif" style={{fontStyle:"italic", color:"var(--gold)"}}>cycle</em><br/>
        that turned prospects<br/>
        into positions.
      </h1>

      <p style={{
        position:"relative",
        maxWidth:640, fontSize:17, lineHeight:1.65, color:"var(--t2)", fontWeight:300,
        marginBottom:48, textWrap:"pretty"
      }}>
        A 30-day record of conversations, commitments, and signal — curated for the people
        Baseline Analytics trusts most. No marketing gloss. What happened, what it means, what's next.
      </p>

      {/* Numeric masthead */}
      <div style={{
        position:"relative",
        display:"grid",
        gridTemplateColumns:"repeat(4, 1fr)",
        borderTop:"1px solid var(--line-2)",
        borderBottom:"1px solid var(--line-2)",
        padding:"24px 0"
      }}>
        <HeroStat label="MEETINGS THIS CYCLE" value="8"      unit="convos"/>
        <HeroStat label="INVESTOR CONTACTS"   value="4"      unit="active"  accent/>
        <HeroStat label="COMP SET VALUE"      value="$6.0"   unit="B+"/>
        <HeroStat label="ACIS RANGE"          value="$15–50" unit="M / yr"  accent last/>
      </div>

      {/* Clock line */}
      <div style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:22}}>
        <div className="mono" style={{fontSize:10,color:"var(--t3)",letterSpacing:"0.18em"}}>
          VOL. 04 · NO. 02 · BASELINE ANALYTICS STAKEHOLDER DISPATCH
        </div>
        <div className="mono tnum" style={{fontSize:10,color:"var(--gold)",letterSpacing:"0.14em"}}>
          {hhmm}<span style={{color:"var(--gold-m)",marginLeft:4}}>{ss} PT</span>
          <span style={{marginLeft:10,color:"var(--t3)"}}>·</span>
          <span style={{marginLeft:10,color:"var(--t2)"}}>LAST SYNC 06 MIN</span>
        </div>
      </div>
    </section>
  );
}

function HeroStat({label, value, unit, accent, last}){
  return (
    <div style={{
      padding:"4px 24px",
      borderLeft: "1px solid var(--line-2)",
      borderRight: last ? "1px solid var(--line-2)" : "none",
      display:"flex",flexDirection:"column",gap:10
    }}>
      <span className="mono" style={{fontSize:9.5,letterSpacing:"0.2em",color:"var(--t3)"}}>{label}</span>
      <div style={{display:"flex",alignItems:"baseline",gap:6}}>
        <span className="serif tnum" style={{
          fontSize:44,fontWeight:300,
          color: accent? "var(--gold)" : "var(--t1)",
          letterSpacing:"-0.02em",lineHeight:1
        }}>{value}</span>
        {unit && <span className="mono" style={{fontSize:10.5,color:"var(--t2)"}}>{unit}</span>}
      </div>
    </div>
  );
}

Object.assign(window, { Hero });
