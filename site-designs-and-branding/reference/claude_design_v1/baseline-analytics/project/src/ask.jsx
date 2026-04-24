// Ask the Portal — briefing tool

function Ask(){
  const QS = window.QS, ANS = window.ANS, CTX = window.CTX;
  const [input, setInput] = React.useState("");
  const [q, setQ] = React.useState("");
  const [a, setA] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [hist, setHist] = React.useState([]);

  const ask = async (question) => {
    setQ(question); setA(""); setLoading(true);
    const msgs = [...hist, {role:"user", content:question}];
    if (ANS[question]) {
      setA(ANS[question]);
      setHist([...msgs, {role:"assistant", content:ANS[question]}]);
      setLoading(false); return;
    }
    try {
      const r = await window.claude.complete({ messages: msgs.slice(-6), system: CTX });
      setA(r || "No response.");
      setHist([...msgs, {role:"assistant", content:r}]);
    } catch { setA("Connection error."); }
    setLoading(false);
  };

  const submit = () => { if (input.trim()) { ask(input.trim()); setInput(""); } };

  const prompts = [
    {cat:"CYCLE", qs:QS.slice(0,2)},
    {cat:"RESEARCH", qs:QS.slice(2,4)},
    {cat:"OPERATIONS", qs:QS.slice(4,6)},
  ];

  return (
    <Section
      num={7}
      eyebrow="ASK THE PORTAL"
      title={<span>Your private <em className="serif" style={{fontStyle:"italic",color:"var(--gold)"}}>briefing</em> desk.</span>}
      kicker="Not a chatbot. A briefing tool with full access to the cycle's meetings, buzz, and source materials. Ask it anything a stakeholder would ask."
      right={
        <div style={{textAlign:"right"}}>
          <div className="mono" style={{fontSize:9.5,letterSpacing:"0.2em",color:"var(--gold-m)"}}>CONTEXT WINDOW</div>
          <div className="mono tnum" style={{fontSize:13,color:"var(--gold)",marginTop:4}}>8 MEETINGS · 8 BUZZ · 6 DOCS</div>
        </div>
      }
    >
      <div style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:0,border:"1px solid var(--gold)",minHeight:460}}>
        {/* LEFT: composer + prompts */}
        <div style={{padding:"36px 36px 30px",borderRight:"1px solid var(--line-2)",background:"linear-gradient(180deg, rgba(255,198,85,0.04) 0%, transparent 60%)",position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:22}}>
            <span style={{width:8,height:8,background:"var(--gold)",animation:"pulseDot 2s ease-in-out infinite"}}/>
            <span className="mono" style={{fontSize:10,letterSpacing:"0.22em",color:"var(--gold)"}}>BRIEFING DESK · ONLINE</span>
          </div>

          <div style={{position:"relative",marginBottom:22}}>
            <div style={{
              display:"flex",alignItems:"center",gap:10,
              padding:"16px 18px",
              border:"1px solid var(--line-2)",
              background:"rgba(0,0,0,0.6)"
            }}>
              <span className="mono" style={{fontSize:12,color:"var(--gold)"}}>›</span>
              <input
                type="text"
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter" && submit()}
                placeholder="Type a question about this cycle…"
                style={{
                  flex:1,background:"transparent",border:"none",outline:"none",
                  color:"var(--t1)",fontSize:14,fontFamily:"inherit"
                }}
              />
              <span className="mono" style={{fontSize:10,color:"var(--t3)",letterSpacing:"0.14em"}}>↵</span>
            </div>
            <button onClick={submit} disabled={!input.trim()||loading} style={{
              marginTop:10,
              background: input.trim()? "var(--gold)":"rgba(255,198,85,0.15)",
              color: input.trim()? "#000":"var(--t3)",
              border:"none",
              padding:"11px 20px",
              fontSize:10.5,
              fontFamily:"JetBrains Mono,monospace",
              letterSpacing:"0.22em",
              fontWeight:600,
              cursor: input.trim()? "pointer":"default",
              width:"100%"
            }}>{loading? "· · ·" : "REQUEST BRIEFING →"}</button>
          </div>

          {/* Categorized prompts */}
          <div style={{borderTop:"1px solid var(--line-2)",paddingTop:20}}>
            <div className="mono" style={{fontSize:9.5,letterSpacing:"0.22em",color:"var(--gold-m)",marginBottom:14}}>BRIEFING PROMPTS</div>
            {prompts.map(p=>(
              <div key={p.cat} style={{marginBottom:14}}>
                <div className="mono" style={{fontSize:9,letterSpacing:"0.22em",color:"var(--t3)",marginBottom:6}}>§ {p.cat}</div>
                {p.qs.map(qu=>(
                  <button key={qu} onClick={()=>ask(qu)} style={{
                    display:"block",width:"100%",textAlign:"left",
                    background:"transparent",
                    border:"none",
                    borderBottom:"1px solid rgba(255,255,255,0.05)",
                    padding:"8px 0",
                    color: q===qu? "var(--gold)":"var(--t2)",
                    fontSize:12.5,
                    cursor:"pointer",
                    transition:"color .2s"
                  }}
                  onMouseEnter={e=>e.target.style.color="var(--gold)"}
                  onMouseLeave={e=>e.target.style.color = q===qu? "var(--gold)":"var(--t2)"}
                  >
                    <span style={{opacity:0.5,marginRight:8}}>→</span>{qu}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: response */}
        <div style={{padding:"36px 36px",background:"rgba(0,0,0,0.5)",position:"relative",display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,paddingBottom:12,borderBottom:"1px solid var(--line-2)"}}>
            <span className="mono" style={{fontSize:10,letterSpacing:"0.22em",color:"var(--gold-m)"}}>BRIEFING / RESPONSE</span>
            <span className="mono" style={{fontSize:9.5,letterSpacing:"0.18em",color:"var(--t3)"}}>
              {loading? "COMPILING…" : q? "RESPONSE READY" : "AWAITING QUERY"}
            </span>
          </div>

          {!q && !loading && (
            <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",gap:14}}>
              <div style={{fontSize:24,fontFamily:"Fraunces,serif",fontWeight:300,fontStyle:"italic",color:"var(--t2)",letterSpacing:"-0.015em",lineHeight:1.3,textWrap:"balance"}}>
                Select a briefing prompt, or compose your own.
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,width:"100%",marginTop:18,border:"1px solid var(--line-2)"}}>
                {[
                  {k:"STATUS", v:"Cycle 04 · Active"},
                  {k:"COVERAGE", v:"Full portal data"},
                  {k:"TONE", v:"Briefing, concise"},
                  {k:"SOURCE", v:"8 meetings · 8 buzz"},
                ].map(x=>(
                  <div key={x.k} style={{padding:"14px 18px",borderRight:"1px solid var(--line-2)",borderBottom:"1px solid var(--line-2)", marginBottom:"-1px",marginRight:"-1px"}}>
                    <div className="mono" style={{fontSize:9.5,letterSpacing:"0.22em",color:"var(--t3)"}}>{x.k}</div>
                    <div style={{fontSize:13,color:"var(--t1)",marginTop:4}}>{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div style={{flex:1,display:"flex",alignItems:"center",gap:12,color:"var(--t2)",fontSize:13}}>
              <span style={{color:"var(--gold)",animation:"shimmer 1s ease-in-out infinite"}}>▌</span>
              <span className="mono" style={{letterSpacing:"0.12em"}}>Compiling from cycle records…</span>
            </div>
          )}

          {q && a && !loading && (
            <div style={{flex:1,display:"flex",flexDirection:"column", animation:"fadeUp .5s ease both"}}>
              <div className="mono" style={{fontSize:10,letterSpacing:"0.2em",color:"var(--gold)",marginBottom:12}}>
                Q / {q.toUpperCase()}
              </div>
              <p className="serif" style={{
                fontSize:19,
                fontWeight:400,
                lineHeight:1.5,
                color:"var(--merc)",
                letterSpacing:"-0.005em",
                textWrap:"pretty",
                whiteSpace:"pre-wrap"
              }}>{a}</p>
              <div style={{marginTop:"auto",paddingTop:20,borderTop:"1px solid var(--line-2)",display:"flex",justifyContent:"space-between"}}>
                <span className="mono" style={{fontSize:9.5,color:"var(--t3)",letterSpacing:"0.18em"}}>COMPILED · {new Date().toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'})}</span>
                <button onClick={()=>{setQ("");setA("");}} className="mono" style={{background:"transparent",border:"1px solid var(--line-2)",color:"var(--t2)",padding:"5px 12px",fontSize:9.5,letterSpacing:"0.18em",cursor:"pointer"}}>CLEAR</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { Ask });
