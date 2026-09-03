(()=>{
  'use strict';
  const TARGET='f1TerritoryPrivateContacts';
  const phone=s=>String(s||'').replace(/[^0-9+]/g,'').trim();
  const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch(e){return d}};
  const existing=load(TARGET,[]);
  const crm=load('f1CRMContacts',[]);
  const acq=load('acqProMobile',{contacts:[]});
  const incoming=[
    ...(Array.isArray(crm)?crm:[]),
    ...(Array.isArray(acq?.contacts)?acq.contacts:[])
  ].map(c=>({
    id:c.id||('LOCAL-'+phone(c.phone||c.telefono).replace(/\D/g,'')),
    nome:c.name||c.nome||[c.first_name,c.last_name].filter(Boolean).join(' ')||'',
    telefono:phone(c.phone||c.telefono),
    via:c.street||c.via||c.address||'',
    civico:c.civic||c.civico||'',
    comune:c.comune||c.city||'',
    fonte:c.source||c.fonte||'CRM F1 locale',
    note:c.note||c.note_contatto||'',
    migrated_at:new Date().toISOString()
  })).filter(c=>c.telefono&&c.via);
  const map=new Map();
  [...(Array.isArray(existing)?existing:[]),...incoming].forEach(c=>map.set(phone(c.telefono)||c.id,c));
  if(incoming.length)localStorage.setItem(TARGET,JSON.stringify([...map.values()]));
})();