// @ts-nocheck


function QpComponent({
  p
}) {
  return <>{p.illustrations?.map(e => <figure key={e.slot} className="topic-image-slot has-image"><img src={e.url} alt={e.caption} /><figcaption>{e.caption}</figcaption></figure>)}</>;
}

export { QpComponent };
