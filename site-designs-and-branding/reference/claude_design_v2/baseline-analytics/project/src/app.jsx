// App shell + nav + footer

function App(){
  const data = JSON.parse(document.getElementById("portal-data").textContent);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(()=>{ setTimeout(()=>setMounted(true), 80); }, []);

  const [now, setNow] = React.useState(new Date());
  React.useEffect(()=>{ const t = setInterval(()=>setNow(new Date()), 1000); return ()=>clearInterval(t); }, []);

  const sections = [
    {id:"dispatch",  n:"01", label:"Dispatch"},
    {id:"dealintel", n:"02", label:"Deal Intel"},
    {id:"velocity",  n:"03", label:"Velocity"},
    {id:"buzz",      n:"04", label:"Buzz"},
    {id:"ledger",    n:"05", label:"Ledger"},
    {id:"vault",     n:"06", label:"Vault"},
    {id:"ask",       n:"07", label:"Ask"},
  ];

  const [active, setActive] = React.useState("dispatch");
  React.useEffect(()=>{
    const onScroll = () => {
      let cur = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) cur = s.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
    return ()=>window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({top: el.offsetTop - 72, behavior:"smooth"});
  };

  return (
    <div style={{
      background:"#000",
      minHeight:"100vh",
      opacity: mounted? 1 : 0,
      transition:"opacity .7s ease"
    }}>
      {/* TOP NAV */}
      <nav style={{
        position:"sticky", top:0, zIndex:100,
        background:"rgba(0,0,0,0.88)",
        backdropFilter:"blur(20px)",
        borderBottom:"1px solid var(--line-2)"
      }}>
        <div style={{maxWidth:1380, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 40px"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <Logo s={28}/>
            <div>
              <div style={{fontSize:12.5,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase"}}>
                Baseline <span style={{color:"var(--t2)",fontWeight:400}}>Analytics</span>
              </div>
              <div className="mono" style={{fontSize:9,color:"var(--gold-m)",letterSpacing:"0.22em",marginTop:2}}>
                STAKEHOLDER PORTAL · VOL. 04
              </div>
            </div>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:2}}>
            {sections.map(s=>(
              <button key={s.id} onClick={()=>scrollTo(s.id)} style={{
                background: active===s.id? "rgba(255,198,85,0.1)":"transparent",
                border:"none",
                color: active===s.id? "var(--gold)":"var(--t2)",
                padding:"7px 12px",
                fontSize:11,
                fontFamily:"JetBrains Mono,monospace",
                letterSpacing:"0.18em",
                cursor:"pointer",
                textTransform:"uppercase",
                display:"flex",alignItems:"center",gap:6
              }}>
                <span style={{fontSize:9,color: active===s.id? "var(--gold-m)":"var(--t3)"}}>{s.n}</span>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{textAlign:"right"}}>
              <div className="mono tnum" style={{fontSize:10,color:"var(--gold)",letterSpacing:"0.14em"}}>
                {now.toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit',hour12:false})} PT
              </div>
              <div className="mono" style={{fontSize:9,color:"var(--t3)",letterSpacing:"0.18em",marginTop:1}}>
                23 APR 2026
              </div>
            </div>
            <div style={{
              width:32,height:32,borderRadius:"50%",
              border:"1px solid var(--gold)",
              background:"rgba(255,198,85,0.08)",
              display:"flex",alignItems:"center",justifyContent:"center",
              color:"var(--gold)",fontSize:11,fontWeight:600
            }}>{data.stakeholder.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
          </div>
        </div>
      </nav>

      {/* BODY */}
      <main style={{maxWidth:1380, margin:"0 auto", padding:"0 40px 40px"}}>
        <div id="dispatch"><Hero cycle={data.cycle} stakeholder={data.stakeholder}/></div>
        <div id="dealintel"><DealIntel/></div>
        <div id="velocity"><Velocity/></div>
        <div id="buzz"><Buzz/></div>
        <div id="ledger"><Meetings/></div>
        <div id="vault"><Vault/></div>
        <div id="ask"><Ask/></div>
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop:"1px solid var(--line-2)",
        marginTop:60,
        background:"linear-gradient(180deg, transparent 0%, rgba(18,18,17,0.6) 100%)"
      }}>
        <div style={{maxWidth:1380,margin:"0 auto",padding:"40px 40px"}}>
          {/* Confidential band */}
          <div style={{
            display:"flex",alignItems:"center",gap:16,
            padding:"14px 20px",
            border:"1px solid var(--gold)",
            background:"rgba(255,198,85,0.04)",
            marginBottom:30
          }}>
            <span style={{width:6,height:6,background:"var(--gold)"}}/>
            <span className="mono" style={{fontSize:10.5,letterSpacing:"0.22em",color:"var(--gold)",fontWeight:600}}>
              BASELINE ANALYTICS · CONFIDENTIAL · PREPARED FOR <span style={{color:"var(--t1)"}}>{data.stakeholder.toUpperCase()}</span>
            </span>
            <span className="mono" style={{fontSize:10,letterSpacing:"0.2em",color:"var(--t3)",marginLeft:"auto"}}>
              {data.stakeholderRole.toUpperCase()}
            </span>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr",gap:40,marginBottom:40}}>
            <div>
              <Logo s={42}/>
              <div className="serif" style={{fontSize:20,fontWeight:400,color:"var(--t1)",marginTop:18,letterSpacing:"-0.015em",lineHeight:1.3,textWrap:"balance"}}>
                Stakeholder-only. <em style={{fontStyle:"italic",color:"var(--gold)"}}>By invitation.</em>
              </div>
              <p style={{fontSize:12.5,color:"var(--t2)",marginTop:12,lineHeight:1.6,fontWeight:300,textWrap:"pretty"}}>
                This portal is a private record for people Baseline Analytics
                has chosen to bring inside the work. Access is keyed to you
                and refreshed every thirty days.
              </p>
            </div>
            <FooterCol title="PORTAL" items={[
              ["Dispatch","#dispatch"],
              ["Deal Intel","#dealintel"],
              ["Velocity","#velocity"],
              ["Buzz","#buzz"],
            ]}/>
            <FooterCol title="RECORD" items={[
              ["Ledger","#ledger"],
              ["Vault","#vault"],
              ["Ask","#ask"],
            ]}/>
            <FooterCol title="OPERATIONS" items={[
              ["Chase Spivey · CEO",""],
              ["Sheldon McClelland · COO",""],
              ["Jeff Newman · Chairman",""],
            ]}/>
          </div>

          <div style={{borderTop:"1px solid var(--line-2)",paddingTop:18,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div className="mono" style={{fontSize:10,color:"var(--t3)",letterSpacing:"0.2em"}}>
              © BASELINE ANALYTICS 2026 · ALL RIGHTS RESERVED
            </div>
            <div className="mono" style={{fontSize:10,color:"var(--t3)",letterSpacing:"0.2em"}}>
              CYCLE {data.cycle.toUpperCase()} · CLOSES IN 00D 12H 14M
            </div>
          </div>
        </div>
        <LinesBar count={220} height={10} seed={21}/>
      </footer>
    </div>
  );
}

function FooterCol({title, items}){
  return (
    <div>
      <div className="mono" style={{fontSize:9.5,letterSpacing:"0.24em",color:"var(--gold-m)",marginBottom:14}}>{title}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {items.map(([label,href])=>(
          <a key={label} href={href||"#"} onClick={e=>{ if(!href){e.preventDefault();} }} style={{
            fontSize:12.5,color:"var(--t2)",textDecoration:"none",
            borderBottom:"1px solid transparent",
            paddingBottom:2,width:"fit-content",
            transition:"color .2s, border-color .2s"
          }}
          onMouseEnter={e=>{e.target.style.color="var(--gold)";e.target.style.borderBottomColor="var(--gold)";}}
          onMouseLeave={e=>{e.target.style.color="var(--t2)";e.target.style.borderBottomColor="transparent";}}
          >{label}</a>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
