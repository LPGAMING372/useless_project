export default function About() {
  return (
    <section id="about" className="mx-auto max-w-2xl scroll-mt-20 px-5 py-20">
      <h2 className="font-display text-3xl text-parchment sm:text-4xl">About this place</h2>

      <div className="mt-6 space-y-5 font-body text-stone-300">
        <p>Not every idea deserves to become a startup.</p>
        <p>Some deserve a peaceful burial.</p>
        <p>
          Graveyard of Ideas is a virtual cemetery for the abandoned, the useless, and the
          gloriously unfinished. Bring your 2 a.m. brainwaves, your shower thoughts, your
          &ldquo;Uber for X&rdquo; pitches. We&rsquo;ll examine them, assign a cause of death, and
          give them the send-off they deserve.
        </p>
        <p>
          Nothing you bury is sent anywhere &mdash; every grave lives quietly in your own
          browser&rsquo;s storage. No accounts, no servers, no funding rounds. Just you, your
          terrible ideas, and a shovel.
        </p>
        <p className="text-stone-500">
          Built for the TinkerHub showcase, and for anyone who has ever opened a notes app at
          midnight and typed something they immediately regretted.
        </p>
      </div>
    </section>
  );
}
