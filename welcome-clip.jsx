// Welcome clips — three 10s square films, one composition each, switched by window.OM_CLIP
(function(){
const {CompositionStage, useComposition, Shot, Easing, animate, clamp} = window;
const R = React;
const F = "'Bodoni Moda',Georgia,serif";
const MOTION = {
  enter: (start,end)=>animate({from:0,to:1,start,end,ease:Easing.easeOutCubic}),
  drift: (from,to,start,end)=>animate({from,to,start,end,ease:Easing.easeInOutSine}),
  pop:   (start,end)=>animate({from:0,to:1,start,end,ease:Easing.easeOutExpo}),
};
const IMG = p=>'img/assets-frames-web-'+p.replace(/\.png$/,'.jpg');
// each clip: 4 shots (2.2s each, overlapping crossfades) + end card
const CLIPS = {
  1: { title:['Miami has','a new voice.'], shots:[
      {src:IMG('hero-miami.png'),  pos:'70% 30%', from:1.25, to:1.05},
      {src:IMG('feed-02.png'),     pos:'50% 30%', from:1.05, to:1.22},
      {src:IMG('feed-04.png'),     pos:'40% 50%', from:1.2,  to:1.05},
      {src:IMG('porcelain-4k.png'),pos:'55% 40%', from:1.05, to:1.25}]},
  2: { title:['Not every white smile','is a beautiful smile.'], shots:[
      {src:IMG('editorial-01-pool.png'),pos:'50% 40%', from:1.3, to:1.05},
      {src:IMG('feed-03.png'),     pos:'50% 50%', from:1.05, to:1.3},
      {src:IMG('feed-05.png'),     pos:'50% 30%', from:1.2,  to:1.05},
      {src:IMG('editorial-06.png'),pos:'50% 50%', from:1.05, to:1.25}]},
  3: { title:['The truth','about teeth.'], shots:[
      {src:IMG('hero-mirror.png'), pos:'40% 50%', from:1.05, to:1.3},
      {src:IMG('feed-07.png'),     pos:'50% 50%', from:1.25, to:1.05},
      {src:IMG('precision-4k.png'),pos:'50% 40%', from:1.05, to:1.2},
      {src:IMG('editorial-07.png'),pos:'50% 40%', from:1.2,  to:1.05}]},
};
function Logo({size}){
  const s=size/340;
  return R.createElement('div',{style:{width:size,height:size,flex:'none'}},
    R.createElement('div',{style:{transform:`scale(${s})`,transformOrigin:'top left'}},
      R.createElement('div',{style:{width:340,height:340,borderRadius:999,border:'2.5px solid #fff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',boxSizing:'border-box',paddingTop:2,overflow:'hidden',fontFamily:F}},
        R.createElement('div',{style:{display:'flex',alignItems:'center',gap:14,width:'100%'}},
          R.createElement('div',{style:{flex:1,height:1.3,background:'#fff'}}),
          R.createElement('span',{style:{fontWeight:500,textTransform:'uppercase',display:'inline-block',transform:'scaleX(.78)',whiteSpace:'nowrap',color:'#fff',fontSize:30,letterSpacing:'.06em',lineHeight:1,flex:'none',margin:'0 -16px'}},'THE REAL'),
          R.createElement('div',{style:{flex:1,height:1.3,background:'#fff'}})),
        R.createElement('span',{style:{fontWeight:500,textTransform:'uppercase',whiteSpace:'nowrap',color:'#fff',fontSize:97,letterSpacing:'-.015em',lineHeight:.82,marginTop:14,transform:'scaleX(.85)'}},'MIAMI'),
        R.createElement('span',{style:{fontWeight:500,textTransform:'uppercase',whiteSpace:'nowrap',color:'#fff',fontSize:64,letterSpacing:'-.005em',lineHeight:.82,marginTop:14,transform:'scaleX(.85)'}},'DENTISTS'),
        R.createElement('div',{style:{width:248,height:5,background:'#fff',marginTop:20}}))));
}
function Piece(){
  const {T,CUES}=useComposition();
  const clip=CLIPS[window.OM_CLIP||1];
  const S=1080;
  const shotLen=2.0, x=0.5; // each shot 2.0s, 0.5s crossfade
  const starts=[0,shotLen,shotLen*2,shotLen*3]; // 0,2,4,6 ; end card at 7.6
  const endAt=CUES.Endcard ?? 7.6;
  const kids=[];
  clip.shots.forEach((sh,i)=>{
    const a=starts[i], b=(i<3?starts[i+1]:endAt);
    const fadeIn = i===0?1:MOTION.enter(a-x/2,a+x/2)(T);
    const fadeOut= 1-MOTION.enter(b-x/2,b+x/2)(T);
    const op = clamp(Math.min(fadeIn,fadeOut),0,1);
    const sc = MOTION.drift(sh.from,sh.to,a-x,b+x)(T);
    const px = MOTION.drift(-1.5,1.5,a-x,b+x)(T);
    kids.push(R.createElement('img',{key:'s'+i,src:sh.src,alt:'',style:{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:sh.pos,filter:'grayscale(1) contrast(1.06)',opacity:op,transform:`scale(${sc}) translateX(${px}%)`,willChange:'transform,opacity'}}));
  });
  // grain + vignette
  kids.push(R.createElement('div',{key:'vig',style:{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,rgba(5,5,5,0) 45%,rgba(5,5,5,.7) 100%)',pointerEvents:'none'}}));
  // title lines over shots 2-3
  const tIn=MOTION.pop(1.6,2.6)(T), tOut=1-MOTION.enter(5.4,6.0)(T);
  const tOp=clamp(Math.min(tIn,tOut),0,1);
  kids.push(R.createElement('div',{key:'title',style:{position:'absolute',left:72,right:72,bottom:96,display:'flex',flexDirection:'column',gap:14,opacity:tOp,transform:`translateY(${(1-tIn)*40}px)`}},
    R.createElement('span',{style:{fontFamily:F,fontSize:15,fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:'#C9CCCE'}},'The Real Miami Dentists'),
    ...clip.title.map((ln,i)=>R.createElement('span',{key:i,style:{fontFamily:F,fontWeight:600,fontSize:78,lineHeight:.98,letterSpacing:'-.02em',textTransform:'uppercase',color:'#F4F2EE'}},ln))));
  // ticker top-left / handle
  kids.push(R.createElement('div',{key:'tk',style:{position:'absolute',top:40,left:48,right:48,display:'flex',justifyContent:'space-between',fontFamily:F,fontSize:13,fontWeight:600,letterSpacing:'.22em',textTransform:'uppercase',color:'#F4F2EE',opacity:clamp(Math.min(MOTION.enter(0.2,0.9)(T),1-MOTION.enter(endAt-0.4,endAt)(T)),0,1)}},
    R.createElement('span',null,'Miami · Florida'),R.createElement('span',{style:{color:'#C9CCCE'}},'305')));
  // END CARD
  const eIn=MOTION.enter(endAt-0.3,endAt+0.4)(T);
  const lIn=MOTION.pop(endAt+0.1,endAt+0.9)(T);
  const wIn=MOTION.pop(endAt+0.6,endAt+1.3)(T);
  const fIn=MOTION.pop(endAt+1.1,endAt+1.7)(T);
  kids.push(R.createElement('div',{key:'end',style:{position:'absolute',inset:0,background:'#050505',opacity:eIn,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:36,textAlign:'center'}},
    R.createElement('div',{style:{opacity:lIn,transform:`scale(${0.9+0.1*lIn})`}},R.createElement(Logo,{size:220})),
    R.createElement('div',{style:{display:'flex',flexDirection:'column',gap:10,opacity:wIn,transform:`translateY(${(1-wIn)*24}px)`}},
      R.createElement('span',{style:{fontFamily:F,fontSize:14,fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',color:'#C9CCCE'}},'Welcome to the new'),
      R.createElement('span',{style:{fontFamily:F,fontWeight:600,fontSize:64,lineHeight:.98,letterSpacing:'-.02em',textTransform:'uppercase',color:'#F4F2EE'}},'therealmiamidentists.com')),
    R.createElement('div',{style:{display:'flex',flexDirection:'column',alignItems:'center',gap:18,opacity:fIn,transform:`translateY(${(1-fIn)*18}px)`}},
      R.createElement('span',{style:{fontFamily:F,border:'1px solid #F4F2EE',color:'#F4F2EE',fontSize:14,fontWeight:600,letterSpacing:'.32em',textTransform:'uppercase',padding:'16px 30px'}},'Follow us →'),
      R.createElement('span',{style:{fontFamily:F,fontSize:17,fontWeight:500,letterSpacing:'.14em',color:'#F4F2EE'}},'@therealmiamidentists'),
      R.createElement('span',{style:{fontFamily:F,fontSize:11,fontWeight:600,letterSpacing:'.28em',textTransform:'uppercase',color:'#8A8A8A'}},'Powered by 5 Star Smiles · Instagram · TikTok'))));
  return R.createElement('div',{style:{position:'absolute',inset:0,background:'#050505',overflow:'hidden'}},kids);
}
window.WelcomeClip = function(){
  return R.createElement(CompositionStage,{width:1080,height:1080,bg:'#050505',scenes:window.OM_SCENES,playback:window.OM_PLAYBACK},R.createElement(Piece));
};
})();
