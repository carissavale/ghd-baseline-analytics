// Deal Intel — horizontal comparables ladder

function DealIntel(){
  const deals = window.DEALS;
  const max = Math.max(...deals.map(d=>d.usdM));
  const total = deals.reduce((s,d)=>s+d.usdM, 0);

  const fmtM = v => v >= 1000 ? `$${(v/1000).toFixed(2)}B` : `$${v}M`;

  return (
    <Section
      num={2}
      eyebrow="DEAL INTEL"
      title={<span>The market has already <em className="serif" style={{fontStyle:"italic",color:"var(--gold)"}}>priced</em> this category.</span>}
      kicker={<span>$6B+ in documented sports-tech transactions. ACIS is positioned against a defensible comp set — not wishful math. Sources: public filings, industry press, advisor disclosures.</span>}
      right={
        <div style={{display:"flex",gap:18,alignItems:"flex-start"}}>
          <Figure value={fmtM(total)} label="AGGREGATE COMP SET"/>
          <div style={{width:1,alignSelf:"stretch",background:"var(--line-2)"}}/>
          <Figure value={deals.length} label="TRANSACTIONS TRACKED" color="var(--t1)"/>
        </div>
      }
    >
      {/* Legend */}
      <div style={{display:"flex",gap:22,marginBottom:18, flexWrap:"wrap"}}>
        {[
          {label:"ACQUISITION", color:"#E5E5E5"},
          {label:"PARTNERSHIP", color:"var(--gold-m)"},
          {label:"ANNUAL / LICENSE", color:"var(--gold-dark)"},
          {label:"OUR RANGE · ACIS", color:"var(--gold)"}
        ].map(l=>(
          <div key={l.label} style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:12,height:2,background:l.color}}/>
            <span className="mono" style={{fontSize:9.5,letterSpacing:"0.18em",color:"var(--t2)"}}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{
        border:"1px solid var(--line-2)",
        background:"linear-gradient(180deg, rgba(18,18,17,0.5) 0%, rgba(0,0,0,0.5) 100%)",
        padding:"28px 32px 22px"
      }}>
        {/* x-axis scale */}
        <div style={{position:"relative",marginLeft:280, marginRight:90, marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            {[0, 400, 800, 1200, 1600].map(v=>(
              <span key={v} className="mono" style={{fontSize:9,color:"var(--t3)",letterSpacing:"0.12em"}}>${v}M</span>
            ))}
          </div>
          <div style={{position:"absolute",top:18,left:0,right:0,height:1,background:"var(--line-2)"}}/>
          {/* gridlines */}
          {[0.25,0.5,0.75].map(p=>(
            <div key={p} style={{position:"absolute",top:18,left:`${p*100}%`,height:4,width:1,background:"var(--line-2)"}}/>
          ))}
        </div>

        {deals.sort((a,b)=>b.usdM-a.usdM).map((d,i)=>{
          const pct = (d.usdM / max) * 100;
          const barColor = d.highlight ? "var(--gold)" : d.type==="Acquisition" ? "#E5E5E5" : d.type==="Partnership" ? "var(--gold-m)" : "var(--gold-dark)";
          return (
            <DealRow key={d.id} d={d} pct={pct} barColor={barColor} i={i}/>
          );
        })}

        <div style={{borderTop:"1px solid var(--line-2)",marginTop:16,paddingTop:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span className="mono" style={{fontSize:9.5,color:"var(--t3)",letterSpacing:"0.16em"}}>SOURCE · PUBLIC DISCLOSURES · INDUSTRY PRESS · INTERNAL COMP SET</span>
          <span className="mono" style={{fontSize:9.5,color:"var(--gold-m)",letterSpacing:"0.16em"}}>MEDIAN $95M · MEAN $282M · N={deals.length}</span>
        </div>
      </div>
    </Section>
  );
}

function DealRow({d, pct, barColor, i}){
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        display:"grid",
        gridTemplateColumns:"280px 1fr 90px",
        alignItems:"center",
        gap:0,
        padding:"10px 0",
        borderBottom:"1px solid rgba(255,255,255,0.04)",
        background: hover ? "rgba(255,198,85,0.03)" : "transparent",
        transition:"background .2s"
      }}
    >
      {/* Label column */}
      <div style={{paddingRight:18}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
          <span className="mono" style={{fontSize:9,color:"var(--t3)",letterSpacing:"0.18em"}}>{String(i+1).padStart(2,"0")}</span>
          <span className="mono" style={{fontSize:9,color:d.highlight?"var(--gold)":"var(--gold-m)",letterSpacing:"0.16em",fontWeight:500}}>
            {d.type.toUpperCase()}
          </span>
          <span className="mono" style={{fontSize:9,color:"var(--t3)"}}>· {d.year}</span>
        </div>
        <div style={{
          fontSize:13.5,
          fontWeight: d.highlight? 600 : 500,
          color: d.highlight? "var(--gold)" : "var(--t1)",
          letterSpacing:"-0.005em",
          lineHeight:1.25
        }}>{d.deal}</div>
        {hover && (
          <div style={{fontSize:11,color:"var(--t2)",marginTop:3,lineHeight:1.4}}>{d.note}</div>
        )}
      </div>

      {/* Bar */}
      <div style={{position:"relative",height:28,display:"flex",alignItems:"center"}}>
        <div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(90deg, transparent 0, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)"}}/>
        <div style={{
          height:18, width:`${pct}%`,
          background: d.highlight
            ? `linear-gradient(90deg, var(--gold) 0%, var(--gold-d) 100%)`
            : barColor,
          position:"relative",
          transformOrigin:"left",
          animation:"barGrow .9s cubic-bezier(.2,.8,.2,1) both",
          animationDelay:`${i*0.06}s`
        }}>
          {d.highlight && (
            <div style={{
              position:"absolute",inset:0,
              background:"repeating-linear-gradient(90deg, transparent 0, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)"
            }}/>
          )}
        </div>
        {d.highlight && (
          <span className="mono" style={{
            position:"absolute",
            left:`${pct}%`,
            marginLeft:12,
            fontSize:9.5,
            color:"var(--gold)",
            letterSpacing:"0.22em",
            fontWeight:600,
            background:"#000",
            padding:"2px 6px",
            border:"1px solid var(--gold)"
          }}>◀ ACIS</span>
        )}
      </div>

      {/* Value */}
      <div style={{textAlign:"right",paddingLeft:18}}>
        <span className="mono tnum" style={{
          fontSize:14,
          color: d.highlight? "var(--gold)" : "var(--t1)",
          fontWeight:500
        }}>
          {d.usdM >= 1000 ? `$${(d.usdM/1000).toFixed(2)}B` : `$${d.usdM}M`}
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { DealIntel });
