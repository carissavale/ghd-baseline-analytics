// Vault — documents

function Vault(){
  const DOCS = window.DOCS;
  return (
    <Section
      num={6}
      eyebrow="THE VAULT"
      title={<span>Source materials, <em className="serif" style={{fontStyle:"italic",color:"var(--gold)"}}>indexed</em>.</span>}
      kicker="Primary documents filed this cycle and carried forward."
      right={<Figure value={DOCS.length} unit="docs" label="IN VAULT"/>}
    >
      <div style={{border:"1px solid var(--line-2)"}}>
        {DOCS.map((d,i)=>(
          <div key={i} style={{
            display:"grid",
            gridTemplateColumns:"60px 80px 1fr 140px 120px 100px",
            padding:"18px 22px",
            alignItems:"center",
            borderBottom: i===DOCS.length-1? "none":"1px solid rgba(255,255,255,0.05)",
            transition:"background .2s"
          }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,198,85,0.03)"}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}
          >
            <span className="mono" style={{fontSize:10,color:"var(--gold-m)",letterSpacing:"0.14em"}}>{String(i+1).padStart(2,"0")}</span>
            <div className="mono" style={{fontSize:10,padding:"4px 8px",border:`1px solid var(--gold)`,color:"var(--gold)",letterSpacing:"0.14em",display:"inline-block",width:"fit-content"}}>{d.ext}</div>
            <div className="serif" style={{fontSize:17,fontWeight:400,color:"var(--t1)",letterSpacing:"-0.005em"}}>{d.name}</div>
            <div className="mono" style={{fontSize:10,color:"var(--t2)",letterSpacing:"0.14em"}}>{d.cat.toUpperCase()}</div>
            <div className="mono" style={{fontSize:10,color:"var(--t3)",letterSpacing:"0.14em"}}>{d.pages.toUpperCase()} · {d.date.toUpperCase()}</div>
            <button style={{background:"transparent",border:"1px solid var(--line-2)",color:"var(--gold)",padding:"7px 14px",fontSize:9.5,fontFamily:"JetBrains Mono,monospace",letterSpacing:"0.18em",cursor:"pointer"}}>OPEN →</button>
          </div>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { Vault });
