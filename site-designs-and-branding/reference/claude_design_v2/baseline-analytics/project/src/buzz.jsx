// Buzz — editorial cards with featured (pinned) + 4-across grid

function Buzz({ onOpenAsk }){
  const BUZZ = window.BUZZ, BT = window.BT;
  const featured = BUZZ[0];
  const rest = BUZZ.slice(1);

  return (
    <Section
      num={4}
      eyebrow="RECENT BUZZ"
      title={<span>The <em className="serif" style={{fontStyle:"italic",color:"var(--gold)"}}>dispatch</em>, filed this cycle.</span>}
      kicker="Everything the leadership team shipped in the past 30 days — research, governance, partnerships, brand. Pinned item sets the tone; the rest reads as a table of contents."
      right={
        <div style={{textAlign:"right"}}>
          <span className="mono" style={{fontSize:10,letterSpacing:"0.2em",color:"var(--gold-m)"}}>FILED / {BUZZ.length} ITEMS</span>
          <div className="mono" style={{fontSize:10,letterSpacing:"0.14em",color:"var(--t3)",marginTop:4}}>RESETS ON CYCLE END</div>
        </div>
      }
    >
      {/* Featured */}
      <FeaturedBuzz item={featured}/>

      {/* Grid */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(4, 1fr)",
        borderTop:"1px solid var(--line-2)",
        borderLeft:"1px solid var(--line-2)",
        marginTop:0
      }}>
        {rest.map((b,i)=>(
          <BuzzCard key={b.id} item={b} i={i+1}/>
        ))}
      </div>
    </Section>
  );
}

function FeaturedBuzz({ item }){
  const meta = window.BT[item.type] || {color:"#FFC655", num:"I"};
  return (
    <article style={{
      display:"grid",
      gridTemplateColumns:"1.1fr 1fr",
      border:"1px solid var(--gold)",
      borderBottomWidth:1,
      background:"linear-gradient(135deg, rgba(255,198,85,0.06) 0%, rgba(0,0,0,0) 60%)",
      position:"relative",
      overflow:"hidden"
    }}>
      {/* pin indicator */}
      <div style={{position:"absolute",top:0,left:0,background:"var(--gold)",color:"#000",padding:"5px 14px",fontFamily:"JetBrains Mono,monospace",fontSize:9.5,letterSpacing:"0.22em",fontWeight:600}}>
        ★ PINNED · FEATURED
      </div>

      <div style={{padding:"48px 44px 36px", borderRight:"1px solid var(--line-2)", position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:28}}>
          <Tag label={item.type} color={meta.color} variant="solid"/>
          <span className="mono" style={{fontSize:10,letterSpacing:"0.16em",color:"var(--t3)"}}>FILED {item.date.toUpperCase()} · {item.role.toUpperCase()}</span>
        </div>
        <h3 className="serif" style={{
          fontSize:"clamp(32px,3.4vw,44px)",
          fontWeight:400,
          letterSpacing:"-0.025em",
          lineHeight:1.05,
          color:"var(--t1)",
          textWrap:"balance"
        }}>
          {item.title}
        </h3>

        <div style={{
          marginTop:30,
          paddingLeft:18,
          borderLeft:"2px solid var(--gold)"
        }}>
          <p className="serif" style={{
            fontStyle:"italic",
            fontSize:20,
            lineHeight:1.45,
            color:"var(--merc)",
            fontWeight:400,
            textWrap:"pretty"
          }}>
            “{item.pull || item.desc}”
          </p>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:12,marginTop:30,paddingTop:20,borderTop:"1px solid var(--line-2)"}}>
          <div style={{width:34,height:34,borderRadius:"50%",border:"1px solid var(--gold)",background:"rgba(255,198,85,0.08)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gold)",fontSize:12,fontWeight:600}}>
            {item.author.split(" ").map(w=>w[0]).join("").slice(0,2)}
          </div>
          <div>
            <div style={{fontSize:13,color:"var(--t1)",fontWeight:600}}>{item.author}</div>
            <div className="mono" style={{fontSize:10,letterSpacing:"0.14em",color:"var(--gold-m)"}}>{item.role.toUpperCase()} · BASELINE ANALYTICS</div>
          </div>
        </div>
      </div>

      {/* Right: editorial body + line pattern */}
      <div style={{padding:"48px 44px 36px",position:"relative",background:"rgba(0,0,0,0.6)",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,top:-20,opacity:0.7}}>
          <LinesPattern height={360} density={26} opacity={0.09} animated seed={19}/>
        </div>
        <div style={{position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <span className="serif" style={{fontSize:72,fontWeight:300,color:"var(--gold)",lineHeight:1,letterSpacing:"-0.04em"}}>{meta.num}</span>
            <div style={{height:1,flex:1,background:"var(--line-2)"}}/>
          </div>
          <p style={{fontSize:15,color:"var(--t2)",lineHeight:1.7,fontWeight:300,textWrap:"pretty"}}>{item.desc}</p>

          <div style={{marginTop:28,paddingTop:20,borderTop:"1px solid var(--line-2)",display:"flex",gap:10,flexWrap:"wrap"}}>
            {["Proof of concept","Injury detection","Real league data","Investor-facing"].map(t=>(
              <span key={t} className="mono" style={{fontSize:10,color:"var(--t2)",letterSpacing:"0.12em",padding:"4px 10px",border:"1px solid var(--line-2)"}}>{t.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function BuzzCard({ item, i }){
  const meta = window.BT[item.type] || {color:"#FFC655", num:"?"};
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        padding:"24px 22px 22px",
        borderRight:"1px solid var(--line-2)",
        borderBottom:"1px solid var(--line-2)",
        display:"flex",
        flexDirection:"column",
        gap:14,
        minHeight:260,
        position:"relative",
        background: hover? "rgba(255,198,85,0.04)":"transparent",
        transition:"background .3s",
        cursor:"pointer"
      }}
    >
      {/* Index number, huge, as editorial motif */}
      <span className="serif" style={{
        position:"absolute",
        top:18, right:18,
        fontSize:58, fontWeight:300,
        color: hover? meta.color : "rgba(255,255,255,0.05)",
        lineHeight:1, letterSpacing:"-0.04em",
        transition:"color .3s",
        fontStyle:"italic"
      }}>{meta.num}</span>

      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <Tag label={item.type} color={meta.color}/>
      </div>

      <h3 className="serif" style={{
        fontSize:21,
        fontWeight:400,
        letterSpacing:"-0.01em",
        lineHeight:1.2,
        color:"var(--t1)",
        textWrap:"balance",
        marginTop:4,
        paddingRight:36
      }}>{item.title}</h3>

      <p style={{
        fontSize:13,
        color:"var(--t2)",
        lineHeight:1.55,
        fontWeight:300,
        flex:1,
        display:"-webkit-box",
        WebkitLineClamp:3,
        WebkitBoxOrient:"vertical",
        overflow:"hidden",
        textWrap:"pretty"
      }}>{item.desc}</p>

      <div style={{borderTop:"1px solid var(--line-2)",paddingTop:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:11.5,color:"var(--t1)",fontWeight:500}}>{item.author}</div>
          <div className="mono" style={{fontSize:9,letterSpacing:"0.16em",color:"var(--t3)",marginTop:2}}>{(item.role||"").toUpperCase()}</div>
        </div>
        <div className="mono" style={{fontSize:10,letterSpacing:"0.14em",color:meta.color}}>{item.date.toUpperCase()}</div>
      </div>
    </article>
  );
}

Object.assign(window, { Buzz });
