const KNOWN = {
  "colts-vs-commanders":
    "An NFL sideline at night after a quarterback has left with a knee injury. An unmarked navy helmet rests on the empty bench beside a hinged knee brace and a folded towel. Burgundy and blue stadium light falls on the grass. No people.",
  "padres-vs-brewers":
    "Inside a baseball stadium at night with the roof closed. A baseball hangs in midair just under the dark steel roof trusses above the outfield grass, and a distant fielder looks up. Brown and navy seats, playoff lighting.",
  "cowboys-vs-texans":
    "An American football field in the hour before a night game. Two unmarked helmets, one silver-navy and one deep red, sit on the turf at midfield while the stands begin to fill. No people in the foreground.",
  "rams-vs-eagles":
    "Field-level view of a live night football game, shot from behind the offense. Players wear plain royal blue and midnight green, helmets unmarked, faces hidden. The crowd is a blur of light.",
  "patriots-vs-bills":
    "A cold night football game. A quarterback in plain navy, seen from behind, drops back to pass with his breath fogging. The defense wears plain red and unmarked helmets. Winter air, bright stadium lights.",
  lucki:
    "An empty hip-hop club stage after the show. One microphone in a hard white spotlight, a scuffed black floor, deep red curtains, and the rest of the room dark. Quiet and tense. No people.",
  colts:
    "Dusk in a huge European soccer stadium where an American football game is about to be played. Plain blue uniforms and unmarked helmets line up on the pitch, faces hidden. The stands are oval, not a US football bowl.",
  "yankees-vs-rays":
    "A night playoff baseball game that is nearly perfect. A pitcher in plain navy is seen from behind on the mound, cap unmarked, all the bases empty, the catcher small in the distance.",
  "cavan-sullivan":
    "Night international soccer. A young player seen strictly from behind, in a plain white kit with no crest, strikes a shot that is ripping into the goal net. A large crowd is out of focus.",
  "argentina-vs-burkina-faso":
    "A floodlit soccer match that has become a rout. The ball is in the back of the net and players in plain light-blue and green kits celebrate as silhouettes, no crests, no numbers.",
  "miami-fl-vs-clemson":
    "A night college football game. A defensive line in plain green is crouched and has contained an offense in plain orange. Helmets are unmarked and faces are hidden. The crowd is a blur of orange and green.",
  "estados-unidos-mexico":
    "A night soccer match. A goalkeeper in a plain green kit with no crest kneels alone in the goalmouth, back to the camera, head bowed. The net is still. The stadium feels heavy and quiet.",
  "mcneese-state-vs-lsu":
    "Late in a night college game inside a huge stadium washed in purple and gold. The offense is still lined up, as if the clock was never sped up. Plain uniforms, unmarked helmets, faces hidden. The scoreboard is only a soft glow.",
  "florida-vs-missouri":
    "A night college football blowout. A running back in plain black and gold, seen from behind, bursts through a gap while defenders in plain blue and orange trail. Helmets have no marks.",
  "spain-vs-czechia":
    "Floodlit soccer. A winger in a plain red kit with no crest, seen from the side and slightly behind so the face is hidden, strikes the ball toward goal on a scoring run.",
  dodgers:
    "A night baseball playoff. A pitcher in a plain blue cap with no logo is mid-delivery, face hidden, while a row of unused bats leans in the opposing dugout.",
  "iowa-football":
    "An autumn college football afternoon. A receiver in a plain scarlet jersey leaps in the end zone, back to the camera, both hands securing the football. The helmet is unmarked. Packed stands.",
  "jets-vs-bears":
    "An American football field before kickoff on a gray afternoon. Two unmarked helmets, one green and one navy, rest on the turf. The stands are still filling. No people close to the camera.",
  "packers-vs-buccaneers":
    "An NFL locker-room bench before a game. Four unmarked green helmets are set aside, and two more plain red helmets sit apart, the way an injury report clears players out. No people.",
  "texas-tech-vs-colorado":
    "After a college football blowout, a quarterback stands alone at midfield, seen from behind, helmet unmarked. One side of the stadium is red and the other is black and gold, and most of the seats are quiet.",
  "arkansas-vs-texas-a-and-m":
    "A night college football game decided on the ground. A running back seen from behind churns through the line on torn-up turf, plain maroon jersey, unmarked helmet, defenders falling behind him.",
  "indiana-vs-rutgers":
    "A night college football highlight. A ball carrier in plain crimson, seen from behind, leans through a tackle under bright lights. The other team wears plain scarlet. Helmets hide every face. No numbers.",
  "kentucky-vs-south-carolina":
    "A hot college sideline late in a game where a lead slipped away. A coach stands with his back to the camera, hands on his hips. The crowd is a blur of blue and garnet. The scoreboard is only soft light.",
  "washington-vs-usc":
    "A night football goal-line stand. A pile of players in plain purple and cardinal, helmets unmarked and faces hidden, the ball spotted just short of the end zone. The crowd is standing.",
  "byu-vs-tcu":
    "A wet college football field at night in a messy, low-scoring game. A football has just cleared the uprights. Players in plain navy and purple stand still, faces hidden by unmarked helmets.",
};

function blobOf(post) {
  const notes = Array.isArray(post.blocks) ? post.blocks.map((block) => block.text ?? "").join(" ") : "";
  return `${post.query ?? ""} ${post.headline ?? ""} ${notes}`.toLowerCase();
}

function sceneFor(post) {
  if (KNOWN[post.slug]) return KNOWN[post.slug];
  const blob = blobOf(post);

  if (/stab|fight with|attack/.test(blob)) {
    return "An empty music-club stage after a show. One microphone in a hard spotlight, the rest of the room dark. No people.";
  }
  if (/roof/.test(blob)) {
    return "A night baseball stadium with the roof closed. A baseball hangs just under the steel trusses above the outfield.";
  }
  if (/knee|ruled out|questionable|injury/.test(blob)) {
    return "An empty football sideline at night. Unmarked helmets and a knee brace rest on the bench, the way an injury report clears a lineup. No people.";
  }
  if (/perfect|shuts down|shut out/.test(blob)) {
    return "A night baseball game. A pitcher seen from behind, cap unmarked, with the bases empty and unused bats in the dugout.";
  }
  if (/soccer|futbol|méxico|mexico|spain|argentina|goal/.test(blob)) {
    return "Floodlit soccer at night. Players in plain kits with no crests chase a ball toward the net, faces turned away.";
  }
  if (/baseball|inning|alds|nlds|dodgers|yankees|padres|brewers/.test(blob)) {
    return "A night baseball game seen from the seats. The diamond is bright and the players are distant shapes in plain uniforms.";
  }
  if (/football|nfl|ncaaf|vs/.test(blob)) {
    return "A night football game from field level. Players in plain uniforms and unmarked helmets are lined up, faces hidden, stadium lights above a packed crowd.";
  }
  return "A documentary photograph of the place this event happened, empty of celebrities and portraits, framed the way a newspaper photographer would shoot the scene.";
}

export function coverPrompt(post) {
  const scene = KNOWN[post.slug] ?? sceneFor(post);
  return [
    "Photorealistic documentary photograph, 35mm lens, natural color, sharp detail, horizontal 16:9 frame.",
    scene,
    "Everything is unmarked: no logos, no numbers, no crests, no brand names.",
    "No readable text, no letters, no scoreboard digits, no watermarks, no captions.",
    "No identifiable faces. Anyone in frame is distant, turned away, or hidden by a helmet.",
    "No blood, no weapons, no graphic injury.",
  ].join(" ");
}
