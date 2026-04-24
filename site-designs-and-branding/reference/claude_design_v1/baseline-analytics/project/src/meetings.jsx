// Meetings ledger — editorial timeline

function Meetings(){
  const M = window.MEETINGS;
  const MT = window.MT;
  const [filter, setFilter] = React.useState("ALL");
  const filtered = filter==="ALL" ? M : M.filter(x=>x.type===filter);

  // group by date
  const grouped = {};
  filtered.forEach(m => { (grouped[m.date] = grouped[m.date] || []).push(m); });

  return (
    <Section
      num={5}
      eyebrow="THE LEDGER"
      title={<span>Who we talked to, <em className="serif" style={{fontStyle:"italic",color:"var(--gold)"}}>what we heard</em>.</span>}
      kicker="Every meaningful conversation this cycle. Indexed, filterable, summarized. No CRM pastiche — just what a stakeholder would want on record."
      right={
        <div style={{display:"flex",gap:0,border:"1px solid var(--line-2)"}}>
          {["ALL","INVESTOR","ADVISORY","STRATEGY"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{
              background: filter===f? "var(--gold)":"transparent",
              color: filter===f? "#000":"var(--t2)",
              border:"none",
              padding:"7px 12px",
              fontSize:9.5,
              letterSpacing:"0.18em",
              fontFamily:"JetBrains Mono,monospace",
              cursor:"pointer"
            }}>{f}</button>
          ))}
        </div>
      }
    >
      <div style={{border:"1px solid var(--line-2)"}}>
        <div style={{
          display:"grid",
          gridTemplateColumns:"80px 120px 1fr 180px 80px",
          padding:"10px 20px",
          borderBottom:"1px solid var(--line-2)",
          background:"rgba(18,18,17,0.8)"
        }}>
          {["#","DATE","CONVERSATION","COUNTERPARTY","TYPE"].map(h=>(
            <span key={h} className="mono" style={{fontSize:9.5,letterSpacing:"0.2em",color:"var(--gold-m)",fontWeight:500}}>{h}</span>
          ))}
        </div>
        {filtered.map((m,i)=>{
          const meta = MT[m.type];
          return (
            <div key={m.id} style={{
              display:"grid",
              gridTemplateColumns:"80px 120px 1fr 180px 80px",
              padding:"18px 20px",
              borderBottom: i===filtered.length-1? "none":"1px solid rgba(255,255,255,0.05)",
              alignItems:"start",
              transition:"background .2s"
            }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,198,85,0.03)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}
            >
              <span className="mono" style={{fontSize:11,color:"var(--gold-m)",letterSpacing:"0.14em",paddingTop:3}}>{String(i+1).padStart(2,"0")}</span>
              <div className="mono" style={{fontSize:11,color:"var(--t1)",letterSpacing:"0.08em",paddingTop:3}}>{m.date.toUpperCase()}</div>
              <div style={{paddingRight:16}}>
                <div className="serif" style={{fontSize:17,fontWeight:400,color:"var(--t1)",letterSpacing:"-0.005em",lineHeight:1.25,marginBottom:5}}>{m.title}</div>
                <div style={{fontSize:12.5,color:"var(--t2)",lineHeight:1.55,fontWeight:300,textWrap:"pretty"}}>{m.summary}</div>
              </div>
              <div style={{paddingTop:3}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <div style={{width:26,height:26,border:`1px solid ${meta.color}55`,background:`${meta.color}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:meta.color,fontWeight:600}}>{m.org[0]}</div>
                  <span style={{fontSize:12,color:"var(--t2)"}}>{m.org}</span>
                </div>
              </div>
              <div style={{paddingTop:3}}>
                <Tag label={meta.label} color={meta.color}/>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

Object.assign(window, { Meetings });
