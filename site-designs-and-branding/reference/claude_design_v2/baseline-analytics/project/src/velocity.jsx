// Meeting velocity — 30-day bar chart segmented by type

function Velocity(){
  const V = window.VELOCITY;
  const maxDaily = Math.max(...V.map(d => d.inv + d.adv + d.str), 3);
  const totals = V.reduce((a,d)=>({inv:a.inv+d.inv, adv:a.adv+d.adv, str:a.str+d.str}), {inv:0,adv:0,str:0});
  const total = totals.inv + totals.adv + totals.str;

  const [mode, setMode] = React.useState("stack"); // stack | lines

  return (
    <Section
      num={3}
      eyebrow="MEETING VELOCITY"
      title={<span>30-day <em className="serif" style={{fontStyle:"italic",color:"var(--gold)"}}>pulse</em></span>}
      kicker="Every conversation indexed by type. Density tells the story — clustered investor activity around month-end, advisory board warming, steady strategic tempo."
      right={
        <div style={{display:"flex",gap:0,border:"1px solid var(--line-2)"}}>
          {[["stack","BARS"],["lines","SPARK"]].map(([k,l])=>(
            <button key={k} onClick={()=>setMode(k)} style={{
              background:mode===k?"var(--gold)":"transparent",
              color:mode===k?"#000":"var(--t2)",
              border:"none",
              padding:"7px 14px",
              fontSize:9.5,
              letterSpacing:"0.18em",
              fontFamily:"JetBrains Mono,monospace",
              cursor:"pointer"
            }}>{l}</button>
          ))}
        </div>
      }
    >
      {/* Legend + totals */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr) auto",
        gap:0,
        border:"1px solid var(--line-2)",
        borderBottom:"none",
        background:"rgba(18,18,17,0.5)"
      }}>
        <LegendCell label="INVESTOR"  color="#FFC655"  count={totals.inv} note="active pipeline"/>
        <LegendCell label="ADVISORY"  color="#E5E5E5"  count={totals.adv} note="IAB discovery"/>
        <LegendCell label="STRATEGY"  color="#AE8E51"  count={totals.str} note="partnership / internal"/>
        <div style={{padding:"18px 26px",borderLeft:"1px solid var(--line-2)",background:"rgba(255,198,85,0.04)",minWidth:160}}>
          <div className="mono" style={{fontSize:9.5,letterSpacing:"0.2em",color:"var(--gold-m)"}}>TOTAL</div>
          <div className="serif tnum" style={{fontSize:40,fontWeight:300,color:"var(--gold)",letterSpacing:"-0.02em",lineHeight:1.1,marginTop:4}}>{total}</div>
          <div className="mono" style={{fontSize:9,color:"var(--t3)",letterSpacing:"0.14em",marginTop:4}}>/ 31 DAYS</div>
        </div>
      </div>

      {/* Chart */}
      <div style={{border:"1px solid var(--line-2)",padding:"28px 28px 14px",background:"rgba(0,0,0,0.5)"}}>
        {mode==="stack"
          ? <StackChart V={V} maxDaily={maxDaily}/>
          : <SparkChart V={V} maxDaily={maxDaily} totals={totals}/>}

        {/* x-axis */}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:12,borderTop:"1px solid var(--line-2)",paddingTop:8}}>
          {[V[0], V[7], V[14], V[21], V[30]].map((d,i)=>(
            <span key={i} className="mono" style={{fontSize:9.5,color:"var(--t3)",letterSpacing:"0.14em"}}>
              {d.date.toLocaleString('en',{month:'short',day:'numeric'}).toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Marginalia */}
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10.5,color:"var(--t3)",marginTop:10,fontFamily:"JetBrains Mono,monospace",letterSpacing:"0.12em"}}>
        <span>▲ PEAK · APR 02 · SIX CONVOS</span>
        <span>MOMENTUM COEFFICIENT · <span style={{color:"var(--gold)"}}>+1.8×</span> PRIOR CYCLE</span>
      </div>
    </Section>
  );
}

function LegendCell({label, color, count, note}){
  return (
    <div style={{padding:"18px 26px",borderLeft:"1px solid var(--line-2)",borderRight:"1px solid var(--line-2)", marginLeft:"-1px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <span style={{width:10,height:10,background:color}}/>
        <span className="mono" style={{fontSize:9.5,letterSpacing:"0.2em",color:"var(--t2)"}}>{label}</span>
      </div>
      <div style={{display:"flex",alignItems:"baseline",gap:8}}>
        <span className="serif tnum" style={{fontSize:36,fontWeight:300,color,letterSpacing:"-0.02em",lineHeight:1}}>{count}</span>
        <span className="mono" style={{fontSize:10,color:"var(--t3)"}}>{note}</span>
      </div>
    </div>
  );
}

function StackChart({V, maxDaily}){
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:3,height:180,position:"relative"}}>
      {/* baseline grid lines */}
      {[0.25,0.5,0.75,1].map(p=>(
        <div key={p} style={{position:"absolute",left:0,right:0,bottom:`${p*100}%`,height:1,background:"rgba(255,255,255,0.04)"}}/>
      ))}
      {V.map((d,i)=>{
        const h = (d.inv+d.adv+d.str);
        return (
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",position:"relative",height:"100%",minWidth:4}}>
            {h===0 && (
              <div style={{height:1,background:"rgba(255,255,255,0.08)",marginBottom:0}}/>
            )}
            {d.str>0 && <div style={{height:`${d.str/maxDaily*100}%`,background:"#AE8E51",transformOrigin:"bottom",animation:"lineGrow .8s ease both",animationDelay:`${i*0.015}s`}}/>}
            {d.adv>0 && <div style={{height:`${d.adv/maxDaily*100}%`,background:"#E5E5E5",transformOrigin:"bottom",animation:"lineGrow .8s ease both",animationDelay:`${i*0.015+0.05}s`}}/>}
            {d.inv>0 && <div style={{height:`${d.inv/maxDaily*100}%`,background:"#FFC655",transformOrigin:"bottom",animation:"lineGrow .8s ease both",animationDelay:`${i*0.015+0.1}s`}}/>}
            {/* tick */}
            {i%7===0 && <div style={{position:"absolute",bottom:-6,left:"50%",width:1,height:4,background:"var(--line-2)"}}/>}
          </div>
        );
      })}
    </div>
  );
}

function SparkChart({V, maxDaily, totals}){
  const W = 1000, H = 180;
  const step = W / (V.length-1);
  const buildPath = key => {
    const max = Math.max(...V.map(d=>d[key]), 1);
    let path = "";
    V.forEach((d,i)=>{
      const x = i*step;
      const y = H - (d[key]/max) * (H-20) - 8;
      path += (i===0?"M":"L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    });
    return path;
  };
  const buildArea = key => {
    const max = Math.max(...V.map(d=>d[key]), 1);
    let path = `M 0 ${H} `;
    V.forEach((d,i)=>{
      const x = i*step;
      const y = H - (d[key]/max) * (H-20) - 8;
      path += "L " + x.toFixed(1) + " " + y.toFixed(1) + " ";
    });
    path += `L ${W} ${H} Z`;
    return path;
  };
  return (
    <div>
      {[
        {k:"inv", color:"#FFC655", label:"INVESTOR"},
        {k:"adv", color:"#E5E5E5", label:"ADVISORY"},
        {k:"str", color:"#AE8E51", label:"STRATEGY"}
      ].map((s,idx)=>(
        <div key={s.k} style={{marginBottom:idx<2?12:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span className="mono" style={{fontSize:9.5,letterSpacing:"0.2em",color:s.color}}>{s.label}</span>
            <span className="mono tnum" style={{fontSize:10,color:"var(--t3)"}}>N={totals[s.k]}</span>
          </div>
          <svg width="100%" height={54} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <path d={buildArea(s.k)} fill={s.color} opacity="0.08"/>
            <path d={buildPath(s.k)} stroke={s.color} strokeWidth="1.8" fill="none"/>
            {V.map((d,i)=> d[s.k]>0 && (
              <circle key={i} cx={i*step} cy={H - (d[s.k]/Math.max(...V.map(v=>v[s.k]),1))*(H-20)-8} r="3" fill={s.color}/>
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Velocity });
