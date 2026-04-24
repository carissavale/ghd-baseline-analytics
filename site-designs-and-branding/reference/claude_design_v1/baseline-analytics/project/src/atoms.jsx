// Visual atoms — logo, brand pattern, rules, labels, tags

const { useState, useEffect, useRef, useMemo } = React;

// ---------- LOGO ----------
function Logo({s=28, tone="gold"}){
  const gold = "#FFC655", goldM = "#AE8E51", goldD = "#E0AC44";
  const a = tone==="mercury" ? "#E5E5E5" : gold;
  const b = tone==="mercury" ? "#ffffff" : goldM;
  const c = tone==="mercury" ? "rgba(229,229,229,0.6)" : goldD;
  return (
    <svg width={s*.75} height={s} viewBox="0 0 30 40" fill="none" aria-label="Baseline Analytics">
      <rect x="2"  y="0" width="2.2" height="28" rx="1" fill={b}/>
      <rect x="7"  y="4" width="2.2" height="24" rx="1" fill={a}/>
      <rect x="12" y="0" width="2.2" height="32" rx="1" fill={a}/>
      <rect x="17" y="6" width="2.2" height="22" rx="1" fill={a}/>
      <rect x="22" y="2" width="2.2" height="26" rx="1" fill={b}/>
      <path d="M13 32 L8 40 L18 40 Z" fill={c} opacity="0.55"/>
    </svg>
  );
}

// ---------- BRAND PATTERN: vertical lines, animated ----------
// Deterministic generator so layout stays stable between renders
function seeded(seed){ let x = seed; return () => { x = (x*9301+49297) % 233280; return x/233280; }; }

function LinesPattern({height=200, density=60, opacity=0.08, animated=true, seed=7, solid=false}){
  const lines = useMemo(() => {
    const r = seeded(seed);
    const arr = [];
    for (let i=0; i<density; i++){
      const len = 20 + r()*(height-30);
      const y   = r()*(height-len);
      const gold = r() > 0.45;
      const sw  = 0.8 + r()*1.4;
      const op  = opacity * (0.25 + r()*0.85);
      const delay = r()*2.4;
      const dur = 3 + r()*3;
      arr.push({i, len, y, gold, sw, op, delay, dur});
    }
    return arr;
  }, [height, density, opacity, seed]);

  const spacing = 100 / (density+1);
  return (
    <svg width="100%" height={height} preserveAspectRatio="none" viewBox={`0 0 1000 ${height}`} style={{position:"absolute", inset:0, pointerEvents:"none"}}>
      {lines.map(l => {
        const x = (l.i+1) * (1000/(density+1));
        return (
          <line key={l.i}
            x1={x} y1={l.y} x2={x} y2={l.y+l.len}
            stroke={l.gold ? "#FFC655" : "#ffffff"}
            strokeWidth={l.sw}
            opacity={l.op}
            style={animated ? {
              animation: `sway ${l.dur}s ease-in-out infinite`,
              animationDelay: `${l.delay}s`,
              transformOrigin: `${x}px ${l.y + l.len/2}px`
            } : null}
          />
        );
      })}
    </svg>
  );
}

// ---------- DENSE SINGLE-COLUMN PATTERN (for section spacers) ----------
function LinesBar({height=6, count=180, seed=3}){
  const lines = useMemo(() => {
    const r = seeded(seed);
    const arr=[];
    for(let i=0;i<count;i++){
      arr.push({i, h: 1 + r()*height, gold: r()>0.5, op: 0.3+r()*0.7});
    }
    return arr;
  }, [height,count,seed]);
  return (
    <div style={{display:"flex",alignItems:"center",gap:3,height}}>
      {lines.map(l=>(
        <div key={l.i} style={{
          width:1.2, height:l.h, borderRadius:1,
          background: l.gold? "#FFC655":"#ffffff",
          opacity: l.op
        }}/>
      ))}
    </div>
  );
}

// ---------- RULES / TICK ----------
function HR({color="rgba(255,198,85,0.14)", style}){
  return <div style={{height:1, background:color, ...style}}/>;
}

function TickRule({ticks=12, style}){
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:0,height:8, ...style}}>
      {Array.from({length:ticks}).map((_,i)=>(
        <div key={i} style={{
          flex:1,
          height: i%5===0? 8 : i%2===0 ? 5 : 3,
          borderRight:"1px solid rgba(255,198,85,0.22)"
        }}/>
      ))}
    </div>
  );
}

// ---------- KICKER ----------
function Kicker({num, children, color}){
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
      {num != null && (
        <span className="mono" style={{fontSize:10,color:"var(--gold-m)",letterSpacing:"0.14em"}}>
          § {String(num).padStart(2,"0")}
        </span>
      )}
      <div style={{flex:"0 0 18px",height:1,background:color || "var(--gold)"}}/>
      <span className="mono" style={{fontSize:10,fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:color || "var(--gold)"}}>
        {children}
      </span>
    </div>
  );
}

// ---------- TAG (category chip) ----------
function Tag({label, color="#FFC655", variant="outline"}){
  const styles = variant==="solid"
    ? {background:color, color:"#000", border:`1px solid ${color}`}
    : {background:`${color}10`, color, border:`1px solid ${color}33`};
  return (
    <span className="mono" style={{
      display:"inline-flex",alignItems:"center",gap:6,
      padding:"3px 9px 3px 6px",
      fontSize:9.5,fontWeight:500,letterSpacing:"0.16em",textTransform:"uppercase",
      borderRadius:2, lineHeight:1.2,
      ...styles
    }}>
      <span style={{width:4,height:4,background:color,display:"inline-block"}}/>
      {label}
    </span>
  );
}

// ---------- DATA FIGURE (big number with unit + label) ----------
function Figure({value, unit, label, color="var(--gold)"}){
  return (
    <div>
      <div style={{display:"flex",alignItems:"baseline",gap:6}}>
        <span className="serif tnum" style={{fontSize:48,fontWeight:300,color,letterSpacing:"-0.02em",lineHeight:1}}>{value}</span>
        {unit && <span className="mono" style={{fontSize:11,color:"var(--t2)",fontWeight:500}}>{unit}</span>}
      </div>
      {label && <div className="mono" style={{fontSize:9.5,fontWeight:500,letterSpacing:"0.2em",color:"var(--t3)",textTransform:"uppercase",marginTop:6}}>{label}</div>}
    </div>
  );
}

// ---------- SECTION WRAPPER ----------
function Section({id, num, eyebrow, title, kicker, right, children, style}){
  return (
    <section id={id} style={{padding:"72px 0 8px",borderTop:"1px solid var(--line-2)", position:"relative", ...style}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,gap:24}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
            <span className="mono" style={{fontSize:11,letterSpacing:"0.2em",color:"var(--gold)"}}>§ {String(num).padStart(2,"0")}</span>
            <div style={{width:40,height:1,background:"var(--gold)"}}/>
            <span className="mono" style={{fontSize:10,letterSpacing:"0.24em",color:"var(--gold-m)",textTransform:"uppercase"}}>{eyebrow}</span>
          </div>
          <h2 className="serif" style={{fontSize:44,fontWeight:300,letterSpacing:"-0.025em",lineHeight:1.05,color:"var(--t1)"}}>{title}</h2>
          {kicker && <p style={{marginTop:10,fontSize:14,color:"var(--t2)",maxWidth:620,lineHeight:1.55,fontWeight:300}}>{kicker}</p>}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

Object.assign(window, { Logo, LinesPattern, LinesBar, HR, TickRule, Kicker, Tag, Figure, Section, seeded });
