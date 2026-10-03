import { OCTOBER_3 } from "@/lib/october3";

export type StoryBlock = { type: "p"; text: string } | { type: "h2"; text: string };

export type Story = {
  headline: string;
  dek: string;
  card: string;
  blocks: StoryBlock[];
};

export const STORIES: Record<string, Story> = {
  "steelers-vs-browns": {
    headline: "The Browns beat the Steelers, 27-24, and sit atop the North",
    dek: "Deshaun Watson threw for 268 yards and led a third straight winning drive. Cleveland took Thursday night. Pittsburgh is still explaining it.",
    card: "Cleveland 27, Pittsburgh 24. The Browns are alone at the top of the AFC North.",
    blocks: [
      {
        type: "p",
        text: "The Browns beat the Steelers 27-24 on Thursday night, and the result did more than settle one rivalry game. Cleveland is now on top of the AFC North. Deshaun Watson threw for 268 yards and, for the third drive in a row when the game was there to be won, he took the Browns down the field and finished the job.",
      },
      {
        type: "h2",
        text: "A one-score night that was not safe",
      },
      {
        type: "p",
        text: "Week 4 of the NFL season put Pittsburgh and Cleveland on national television, which is why the score is being typed as a phrase rather than looked up once and forgotten. Three points is the whole margin. Watson’s yardage is the number attached to it. The winning drive is the reason the Browns, and not the Steelers, own the division lead on Friday morning.",
      },
      {
        type: "p",
        text: "Pittsburgh’s frustrations in Cleveland are an old complaint with a new box score. The Steelers lost late. The head coach, Mike McCarthy, spent the next day walking back a profane sideline argument with Aaron Rodgers, which is its own search. The game itself is simpler. Cleveland scored 27. Pittsburgh scored 24. The Browns are first in the North.",
      },
      {
        type: "h2",
        text: "What the night actually decided",
      },
      {
        type: "p",
        text: "Thursday Night Football in this rivalry does not need a subplot to fill a living room. People want the final, the quarterback line, and whether the division table moved. It did. Watson’s third consecutive game-winning drive is the detail that separates a close loss from a statement, and it is the detail the coverage keeps returning to.",
      },
      {
        type: "p",
        text: "The Steelers will be asked about the finish, the drive they did not stop, and the words on the sideline. The Browns will be asked whether a 27-24 win in Week 4 is the start of something or one loud night. The score does not answer that. It does answer who won.",
      },
    ],
  },
  "ken-urker": {
    headline: "Ken Urker died on his 34th birthday",
    dek: "Gypsy Rose Blanchard says her partner, and the father of her daughter, died of an overdose. She called him her forever soulmate.",
    card: "He was 34. She says it was an overdose. He was the father of her daughter.",
    blocks: [
      {
        type: "p",
        text: "Ken Urker, Gypsy Rose Blanchard’s partner and the father of her daughter, has died. He was 34. The reporting places his death on his 34th birthday, which is why an age that had been described differently in the first hours is no longer the open question it was.",
      },
      {
        type: "h2",
        text: "What Blanchard has said",
      },
      {
        type: "p",
        text: "Blanchard has said Urker died of an overdose, and she has paid tribute to him as her forever soulmate. That account is hers. It is the explanation now attached to his name across the coverage, and it is the one she chose to give while people were still asking what happened.",
      },
      {
        type: "p",
        text: "The rest of the public record is the relationship. He was her former fiancé and, in the newer reporting, her partner. They share a daughter. His name was already known because hers is. A death on a birthday, tied to a story the country has followed for years, is why the search is this large.",
      },
      {
        type: "h2",
        text: "What is settled, and what is her account",
      },
      {
        type: "p",
        text: "He is dead. He was 34. The day being reported is his birthday. He was the father of Blanchard’s daughter. The overdose is what she has said, not a line that should be rewritten as an official finding unless a coroner says the same thing. Until then, the accurate sentence is the one she gave.",
      },
    ],
  },
  "fever-vs-aces": {
    headline: "The Aces end the Fever’s season, 94-83",
    dek: "A’ja Wilson scored 36 points and grabbed 10 rebounds. Las Vegas won the series 2-1 and moved on. Indiana is done.",
    card: "Las Vegas 94, Indiana 83. Wilson had 36. The Fever’s year is over.",
    blocks: [
      {
        type: "p",
        text: "The Las Vegas Aces beat the Indiana Fever 94-83 in a winner-take-all Game 3 and won their first-round series 2-1. A’ja Wilson scored 36 points and added 10 rebounds. Caitlin Clark’s season is over. It is the second year in a row Las Vegas has been the team that ended it.",
      },
      {
        type: "h2",
        text: "How the night closed",
      },
      {
        type: "p",
        text: "The Aces led 70-65 going into the fourth quarter, a period that had been a problem for them for much of the year. They outscored Indiana 24-18 the rest of the way and held the lead. Wilson, the four-time MVP, carried the defending champions. The Aces have won three of the past four titles. They were the third seed. The Fever were the sixth.",
      },
      {
        type: "p",
        text: "A year ago these teams met in the semifinals, and Las Vegas won the series in overtime in the last game. This time the meeting came earlier, in a best-of-three, and it ended the same way for Indiana. Clark’s Fever are out. Wilson’s Aces are not.",
      },
      {
        type: "h2",
        text: "Who is next",
      },
      {
        type: "p",
        text: "Las Vegas advances to the semifinals against the winner of the Golden State Valkyries and Dallas Wings series. That other series was still to be decided in San Francisco. The Aces’ side of the bracket is settled. Indiana’s is not a bracket anymore.",
      },
      {
        type: "p",
        text: "The search is the score, the two stars, and the fact that a season people had been following since spring stopped on a Thursday night in Las Vegas. The final is 94-83. The series is 2-1. The Fever are finished.",
      },
    ],
  },
  "denmark-vs-portugal": {
    headline: "Portugal beat Denmark 4-2, without Ronaldo",
    dek: "Jorge Jesus’s side won a Nations League match while the squad closed ranks behind him. A Denmark forward, a Ronaldo fan, refused the handshake and shoved the coach.",
    card: "Denmark 2, Portugal 4. Ronaldo was not on the pitch. The shove was.",
    blocks: [
      {
        type: "p",
        text: "Portugal beat Denmark 4-2 in the Nations League, and they did it without Cristiano Ronaldo on the field. The score is the result. The week around it is the exit, the coach, and a shove at the handshake line that is traveling as its own clip.",
      },
      {
        type: "h2",
        text: "A squad that answered the noise",
      },
      {
        type: "p",
        text: "After the win, the reporting described a Portugal side united behind coach Jorge Jesus. Vitinha said the manager’s work is already obvious on the pitch, and that it was too clear to argue with. That is the dressing-room reply to a week in which Ronaldo’s absence has been louder than most lineups.",
      },
      {
        type: "p",
        text: "The same international window also brought Jürgen Klopp a first win as Germany’s coach. That is a different match. The American search in front of this one is Portugal, Denmark, and the scoreline UEFA lists as Denmark 2, Portugal 4.",
      },
      {
        type: "h2",
        text: "The handshake",
      },
      {
        type: "p",
        text: "A Denmark forward who supports Ronaldo refused to greet Jesus and pushed him. The match already had a winner. The clip gave the result a second life, which is why the same game is also being searched in Portuguese and Spanish under the managers’ names rather than the score.",
      },
      {
        type: "p",
        text: "Four goals to two is not a fluke to be talked away. Portugal scored. Denmark scored twice and still lost. Ronaldo was the argument. Jesus’s team was the one on the grass.",
      },
    ],
  },
  phillies: {
    headline: "The Braves eliminate the Phillies, 6-2",
    dek: "Michael Harris II, Ozzie Albies and Matt Olson homered. Chris Sale closed it. Atlanta will play the Dodgers. Philadelphia’s season is over.",
    card: "Atlanta 6, Philadelphia 2. The Phillies are out. The Dodgers are next.",
    blocks: [
      {
        type: "p",
        text: "The Atlanta Braves beat the Philadelphia Phillies 6-2 in Game 3 of their National League wild-card series and won the series 2-1. Philadelphia is out. Atlanta’s next opponent is the Los Angeles Dodgers, with the division series opening Saturday in Los Angeles.",
      },
      {
        type: "h2",
        text: "Three home runs, then Sale",
      },
      {
        type: "p",
        text: "Michael Harris II hit a three-run homer in the first inning at Truist Park and put Atlanta up 3-0. Ozzie Albies added a two-run homer in the fourth. Matt Olson hit a solo shot in the seventh. Those were the three home runs. Chris Sale, on one day of rest, came out of the bullpen and got the last four outs.",
      },
      {
        type: "p",
        text: "Ray Kerr opened and threw 3 1/3 scoreless innings. Grant Holmes got the win. Aaron Nola took the loss after a short start in which his command failed him. The Phillies scored once in the sixth and once in the eighth. It was not enough.",
      },
      {
        type: "h2",
        text: "A series Philadelphia used to own",
      },
      {
        type: "p",
        text: "Atlanta had not won a playoff series against the Phillies before this one. Philadelphia had taken the previous three postseason meetings, including the 2022 and 2023 division series. The Braves also blew a two-run lead in the eighth inning of a Game 2 loss before winning the game that mattered. Reporting called this their first postseason advancement since the 2021 World Series.",
      },
      {
        type: "p",
        text: "If the only word you typed was Phillies, the answer is the season. It ended in Atlanta, 6-2, in a winner-take-all game. The Dodgers are who the Braves play next.",
      },
    ],
  },
  "social-security-benefit-increase-projection": {
    headline: "The 2027 Social Security raise is still a forecast",
    dek: "The latest cost-of-living projection moved higher. The official number has not been published. October 14 is the announcement.",
    card: "A higher forecast, not the official COLA. October 14 is the date.",
    blocks: [
      {
        type: "p",
        text: "The latest forecast for the 2027 Social Security cost-of-living adjustment has risen, and that is why retirees are searching it. A forecast is not the check. The Social Security Administration has not published the official COLA. The date circled for that announcement is October 14.",
      },
      {
        type: "h2",
        text: "What is already happening",
      },
      {
        type: "p",
        text: "October payments are going out on the usual schedule. Nothing about the higher projection changes a deposit that was already set. The adjustment people are arguing about is the one that would apply to 2027 benefits, and it is still a projection being updated as the inflation inputs come in.",
      },
      {
        type: "p",
        text: "Every percentage traveling on social media before October 14 is an estimate, including the one that just moved up. Estimates get shared because a benefit increase is money, and money gets typed into a search bar the morning a headline says the number changed.",
      },
      {
        type: "h2",
        text: "The morning the guess ends",
      },
      {
        type: "p",
        text: "October 14 is when the agency is expected to replace the forecast with the figure it will actually use. Until that release, planning around a specific raise means planning around someone else’s model. The projection changed. The official COLA has not.",
      },
    ],
  },
  "rick-ross": {
    headline: "Rick Ross was arrested in Miami Beach, then released",
    dek: "He is charged in a domestic violence case. He says he is totally innocent. His ex-girlfriend Jazzma Kendrick accuses him of beating and choking her.",
    card: "An arrest, a release, a denial, and an accusation that is now public.",
    blocks: [
      {
        type: "p",
        text: "Rick Ross was arrested in Miami Beach on domestic violence charges and later released from jail. He has said he is totally innocent. Jazzma Kendrick, his ex-girlfriend, has accused him of beating and choking her, and of treating her like a punching bag. Those are the two accounts. Neither of them is a verdict.",
      },
      {
        type: "h2",
        text: "The charge and the denial",
      },
      {
        type: "p",
        text: "The arrest happened in Miami Beach. The case sits in Miami-Dade. He is out of custody. An arrest means police had cause to take him in. It does not mean a jury has heard the evidence, and the coverage is explicit that he disputes the accusation in full.",
      },
      {
        type: "p",
        text: "Kendrick’s account is now public in her own words, not only as a line in a police report. She says he physically abused her. He says that is not true. Both sentences can be reported. Only a court can choose between them.",
      },
      {
        type: "h2",
        text: "What has not happened",
      },
      {
        type: "p",
        text: "There has been no trial. He has been booked and released. She has spoken. He has answered. The search is large because he is famous and the allegation is serious, not because the case has been decided. The next factual step is whatever the court does with the charge.",
      },
    ],
  },
  "mike-mccarthy": {
    headline: "McCarthy says he wishes he had not said it",
    dek: "After the Steelers lost 27-24 in Cleveland, the head coach regretted a profane sideline argument with Aaron Rodgers.",
    card: "A sideline argument with Rodgers, and a coach already walking it back.",
    blocks: [
      {
        type: "p",
        text: "Mike McCarthy spent the day after a loss explaining himself. The Steelers had just fallen 27-24 to the Browns. On the sideline during that game, McCarthy and Aaron Rodgers had an argument loud enough, and profane enough, that it became its own story. McCarthy has said he wishes he had not used those words.",
      },
      {
        type: "h2",
        text: "The loss and the exchange",
      },
      {
        type: "p",
        text: "The result is Cleveland’s. Deshaun Watson led a third straight winning drive, and the Browns moved to the top of the AFC North. McCarthy’s regret is separate from the score and stuck to it. Coaches and quarterbacks argue in games that go wrong. This one was public, and the head coach did not wait long to say the language was a mistake.",
      },
      {
        type: "p",
        text: "He has not pretended the exchange did not happen. The reporting quotes him wishing he would not use those words. That is an apology for the manner, delivered after a defeat Pittsburgh did not want replayed for any reason, least of all a sideline clip.",
      },
      {
        type: "h2",
        text: "Why his name is the search",
      },
      {
        type: "p",
        text: "The game is being searched as Steelers versus Browns. McCarthy is being searched because of what he said to his quarterback while the game was getting away. The play that started the argument matters less, in the public record available now, than the fact that he has already walked the wording back.",
      },
    ],
  },
  "what-did-christa-pike-do-to-be-executed": {
    headline: "Tennessee tried to execute Christa Pike. She is still alive.",
    dek: "She was sentenced to death for the 1995 murder of classmate Colleen Slemmer. The attempt failed. Her lawyers say she is in critical condition, and the governor has stayed another try.",
    card: "A 1995 murder conviction, a failed execution, and a woman who is still alive.",
    blocks: [
      {
        type: "p",
        text: "Christa Pike was sentenced to death for killing Colleen Slemmer in 1995. Pike was 18 at the time. A jury later convicted her of first-degree murder and of conspiracy to commit first-degree murder, and in 1996 it sentenced her to death. She was a classmate of Slemmer’s at a job-training program in Knoxville. That conviction is the answer to the question in the search bar.",
      },
      {
        type: "h2",
        text: "The execution did not end her life",
      },
      {
        type: "p",
        text: "Tennessee tried to carry out the sentence this week. Pike survived. Her lawyers, Randy Spivey and Stephen Ferrell, said the next day that she was alive, in critical condition, and receiving lifesaving care at a hospital. They said they had not seen her and did not know her prognosis.",
      },
      {
        type: "p",
        text: "She had been in line to be the first woman executed in Tennessee in about 200 years. A lower court had paused the execution. The U.S. Supreme Court allowed it to proceed, with three justices dissenting. Governor Bill Lee has since stayed another attempt while a third-party investigation looks at what happened. The state says officials followed the protocol. Her lawyers say the attempt failed.",
      },
      {
        type: "h2",
        text: "What the public record supports",
      },
      {
        type: "p",
        text: "Pike has been on death row since the 1990s. In 2001 she was convicted separately of attempted first-degree murder after an assault on another prisoner. Her lawyers have also described abuse she suffered as a child and diagnoses of bipolar disorder and post-traumatic stress disorder. None of that undoes the murder conviction. None of it changes the newer fact that the execution did not kill her.",
      },
      {
        type: "p",
        text: "She is alive. She is reported to be in critical condition. The governor has stopped the state from trying again until someone outside the prison system accounts for the failure. That is the story. A step-by-step of a death chamber is not required to understand it.",
      },
    ],
  },
  "wales-vs-norway": {
    headline: "Wales beat Norway 2-1, and a winless run is over",
    dek: "Oscar Bobb scored first. Dan James equalized. Neco Williams won it from a free kick after Torbjørn Heggem was sent off. Brennan Johnson came on late.",
    card: "A comeback in Cardiff, a red card, and Wales’s first League A win.",
    blocks: [
      {
        type: "p",
        text: "Wales beat Norway 2-1 in Cardiff in the Nations League, and the result ended a winless run. It was also the first League A win of the Craig Bellamy era. Norway led. Norway finished with 10 players. Wales finished in front.",
      },
      {
        type: "h2",
        text: "Bobb, then James, then Williams",
      },
      {
        type: "p",
        text: "Oscar Bobb put Norway ahead in the 11th minute, finishing a pass from Martin Ødegaard with only Danny Ward to beat. Dan James equalized in the 38th minute, sweeping in a cross from Sorba Thomas. It was James’s 11th goal for Wales.",
      },
      {
        type: "p",
        text: "Seconds into the second half, Norway centre-back Torbjørn Heggem was sent off for bringing James down on the edge of the area. Neco Williams scored the winner from the free kick in the 48th minute, bending it past goalkeeper Ørjan Nyland. Wales had gone into the match still looking for a first point and a first goal of this Nations League campaign, after losses to Portugal and Denmark.",
      },
      {
        type: "h2",
        text: "Johnson’s cameo",
      },
      {
        type: "p",
        text: "Brennan Johnson, the Everton forward, stayed on the bench until the 76th minute and replaced James. He did not score. He made a short contribution in a game that was already 2-1, including a foul and an offside, and one challenge that produced a late free kick as Norway pushed. Erling Haaland had a headed chance late and put it at Ward. Josh Sheehan missed a chance for a third Wales goal. The score stayed 2-1.",
      },
      {
        type: "p",
        text: "Bellamy’s side had been stuck. A comeback against Norway, with a red card and a free-kick winner, is why the match is being replayed. The goals were Bobb, James and Williams. Johnson was the substitute people still looked up.",
      },
    ],
  },
  "cornell-7-case": {
    headline: "A special prosecutor is now on the Cornell 7 case",
    dek: "New York’s governor appointed one in a Cornell fraternity investigation that includes an alleged gang rape. Reporting names Letitia James. Lawmakers want a gap in the sex-assault law closed.",
    card: "The investigation changed hands. The argument over the statute is just starting.",
    blocks: [
      {
        type: "p",
        text: "New York’s governor has appointed a special prosecutor in the Cornell fraternity investigation known as the Cornell 7 case. Reporting on the appointment identifies Attorney General Letitia James. The case involves an alleged gang rape. No verdict has been reached. The appointment is the news. The allegation is why the appointment matters outside Ithaca.",
      },
      {
        type: "h2",
        text: "Why the law is part of the story",
      },
      {
        type: "p",
        text: "State lawmakers are using the case to argue that New York’s sexual-assault statute has a gap, and that the gap should be closed. Their point is about what the written law can and cannot reach. It is not a finding that anyone has been convicted. An investigation that just changed hands is still an investigation.",
      },
      {
        type: "p",
        text: "The wider argument climbing up beside the appointment is whether college has become less safe, with Cornell as the example people are using. That is a debate. The fact underneath it is narrower: a fraternity case serious enough that the governor put a special prosecutor on it, and that the attorney general’s name is now on the coverage.",
      },
      {
        type: "h2",
        text: "What has not been decided",
      },
      {
        type: "p",
        text: "There is no conviction to report. There is an alleged gang rape, a campus story that has left campus, and a political fight over the statute. The special prosecutor’s job is to investigate. The legislature’s argument is about the next case, and this one. Those are different pieces of work, and both of them are unfinished.",
      },
    ],
  },
  "capitol-police-plaque-lawsuit-dismissal": {
    headline: "The Jan. 6 plaque lawsuit was thrown out",
    dek: "A judge ruled that Capitol Police officers did not have standing to sue. The court never decided whether the plaque should go up.",
    card: "Officers wanted a plaque. A judge said they could not bring the case.",
    blocks: [
      {
        type: "p",
        text: "Capitol Police officers who wanted a Jan. 6 plaque put up at the Capitol sued to force the issue. A judge dismissed the case. The ruling is that the officers did not have standing, which is the legal threshold for whether they were allowed to sue at all. The court never reached the plaque.",
      },
      {
        type: "h2",
        text: "Standing, not the memorial",
      },
      {
        type: "p",
        text: "Standing is not a comment on whether a plaque is a good idea. It is a decision that these plaintiffs could not bring this claim in this court. The officers had described psychic injuries from the failure to install the memorial. The judge turned that theory away.",
      },
      {
        type: "p",
        text: "The opinion is circulating for a second reason. In dismissing the suit, the judge invoked Chief Justice John Roberts’ dissent in the ballroom case. That citation is what sent the ruling beyond the usual audience for a standing decision. The legal result is plainer than the aside: the lawsuit does not go forward.",
      },
      {
        type: "h2",
        text: "Where the fight stands",
      },
      {
        type: "p",
        text: "The plaque itself was not ordered up or ordered down. The case about it is over, unless a higher court says the standing ruling was wrong. Officers wanted a memorial to January 6. A judge said they were not the people who could sue to demand it.",
      },
    ],
  },
  "uss-klakring-sinking-exercise": {
    headline: "The Navy sank the Klakring on purpose",
    dek: "The retired frigate went down off Scotland in Atlantic Thunder, a live-fire exercise with the Royal Navy. An SM-6, a Sea Venom, a Naval Strike Missile and a Mark 48 hit it first.",
    card: "A drill, a retired hull, and a list of missiles that sent it under.",
    blocks: [
      {
        type: "p",
        text: "The USS Klakring is underwater because the Navy put it there. The retired frigate was the target ship in Atlantic Thunder, a sinking exercise off Scotland run with the Royal Navy. Nobody is missing. The hull had already finished its service. The point was training, and the ending was filmed.",
      },
      {
        type: "h2",
        text: "What hit it",
      },
      {
        type: "p",
        text: "Before it sank, the Klakring was hit by an SM-6, a Sea Venom, a Naval Strike Missile and a Mark 48 torpedo. That list is why the exercise is being searched like an incident. British coverage has called the weapons ship-busters. They were fired at a ship the two navies had already decided to sink.",
      },
      {
        type: "p",
        text: "A live-fire sinking exercise uses an old warship so crews can see what those missiles and that torpedo do to a real hull, in open water, with another navy alongside. The Klakring was a former U.S. frigate. Scotland’s coast was the range. The Royal Navy was the partner.",
      },
      {
        type: "h2",
        text: "A drill with a real ship",
      },
      {
        type: "p",
        text: "The images look like a loss because a warship going under always looks like a loss. The reporting is consistent that this one was planned. The search is the weapons, the exercise name, and the sight of an American frigate disappearing on purpose.",
      },
    ],
  },
  "dominican-republic-vs-haiti": {
    headline: "Haiti beat the Dominican Republic, 4-1",
    dek: "A Concacaf Nations League match that started as a where-to-watch search ended as a scoreline. Haiti scored four.",
    card: "Dominican Republic 1, Haiti 4. The margin is the story.",
    blocks: [
      {
        type: "p",
        text: "Haiti beat the Dominican Republic 4-1 in the Concacaf Nations League. The result is the reason the match is still being replayed. Four goals to one does not need a translator, and it does not need a tactics essay to explain why both countries are searching it.",
      },
      {
        type: "h2",
        text: "Before the whistle, and after",
      },
      {
        type: "p",
        text: "Ahead of kickoff, a large share of the queries were practical: the channel, the stream, the time. Those pages are how a regional match reaches an American evening. After the final whistle the query changed. People wanted the goals, the highlights, and the head-to-head, which this result just rewrote.",
      },
      {
        type: "p",
        text: "The coverage of the match lists the score as Dominican Republic 1, Haiti 4. It does not, in the headlines driving the search, hang the night on a single named scorer. The margin is what traveled. Haiti scored four times. The Dominican Republic scored once.",
      },
      {
        type: "h2",
        text: "Why a group-stage night is this loud",
      },
      {
        type: "p",
        text: "These are two countries whose meetings carry more than a group table, which is why a Nations League fixture can outrun a friendlier scoreline from somewhere else on the same night. A 4-1 game settles the argument on the field even when the argument off it is older than the tournament. Haiti won. The score was 4-1.",
      },
    ],
  },
  "sailors-rescued-after-whale-collision": {
    headline: "A sperm whale sank their yacht. Four sailors came out alive.",
    dek: "The Tai Tam went down in the South Pacific after a pod of sperm whales struck it. Jeremy and Jemma Cooper and two crewmates were pulled from a life raft about 18 hours later.",
    card: "The boat is gone. The four people on it were found.",
    blocks: [
      {
        type: "p",
        text: "A sperm whale cracked the hull of the yacht Tai Tam in the South Pacific, and the boat later sank. Four sailors survived. They spent about 18 hours between the collision and a rescue, part of that time in a life raft, and a container ship took them aboard. No one died.",
      },
      {
        type: "h2",
        text: "What the crew described",
      },
      {
        type: "p",
        text: "The Tai Tam is a 52-foot, Australian-flagged yacht. The crew was Australian couple Jeremy and Jemma Cooper, New Zealander Terry Hetherington and French sailor Martin Jaffray. They told reporters they were among a pod of sperm whales about 250 nautical miles north of Norfolk Island. Jemma Cooper, who was at the wheel, said there was a loud thud and the boat was pushed sideways. She was thrown from the wheel. Her husband was below and was woken by the impact. They later saw the whales.",
      },
      {
        type: "p",
        text: "The hull was cracked and the boat began taking on water. The crew activated an emergency beacon and spoke with New Zealand rescue services. A New Zealand Air Force aircraft stayed overhead and helped guide a ship in. They moved to a life raft, cut the line to the yacht because they feared it would drag them down, and watched the Tai Tam sink.",
      },
      {
        type: "h2",
        text: "The ship that found them",
      },
      {
        type: "p",
        text: "The New Zealand military said the container ship MV Sofrana Surville reached the raft about 18 hours after the collision and took the four sailors aboard. Jeremy Cooper said the approach of a ship that size toward a raft was frightening, and that they were drinking coffee with the captain within half an hour. He called the voyage wonderful and the ending terrible, and said they were lucky no one was lost.",
      },
      {
        type: "p",
        text: "The boat is gone. The four people who were on it are not. That is why a collision in a remote stretch of ocean is one of the largest searches in the United States today.",
      },
    ],
  },
  "kylie-kelce-kate-middleton-apology": {
    headline: "Kylie Kelce apologized for how she addressed Catherine",
    dek: "She had invited the Princess of Wales onto a podcast. The line that traveled was the apology for an address she now says she knows was wrong.",
    card: "A podcast invite, a title used badly, and a public sorry.",
    blocks: [
      {
        type: "p",
        text: "Kylie Kelce has apologized to Catherine, Princess of Wales, for the way she addressed her. Kelce said she knows better now. The comment had been called offensive. The apology is the part being searched, because the invitation that came with it was already strange enough to travel on its own.",
      },
      {
        type: "h2",
        text: "The invite, then the sorry",
      },
      {
        type: "p",
        text: "Kelce invited Catherine onto a podcast. That sentence, a Philadelphia sports wife asking the Princess of Wales to sit for a show, was the first version of the story. The second version is the walk-back. Kelce’s public line, reported as “now I know,” is an admission that the form of address was wrong and that she has been told so.",
      },
      {
        type: "p",
        text: "Catherine did not have to answer for the search to take off. The sorry is the event. Two of the most recognizable names in American sports media and the British royal family landed in the same headline, and the headline was an apology rather than an interview.",
      },
      {
        type: "h2",
        text: "What the record actually contains",
      },
      {
        type: "p",
        text: "There is an invitation. There is a remark about how Catherine was addressed. There is Kelce saying she understands now, after that remark was called offensive. There is no indication in the coverage that the princess granted the interview. The arc is short, and it is complete: a title used badly, and a public apology for it.",
      },
    ],
  },
  "dinamarca-portugal": {
    headline: "Portugal won 4-2. Then a Denmark forward shoved Jorge Jesus.",
    dek: "The Nations League match is the same one Americans are searching in English. The clip traveling everywhere else is a Ronaldo fan refusing the coach’s hand.",
    card: "The score was 4-2. The clip people want is the push.",
    blocks: [
      {
        type: "p",
        text: "Portugal beat Denmark 4-2 in the Nations League. Cristiano Ronaldo was not the player on the grass, and he was still the reason a handshake turned into a shove. A Denmark forward who supports Ronaldo refused to greet coach Jorge Jesus and pushed him. That clip is why this match is being searched again under its Portuguese and Spanish names.",
      },
      {
        type: "h2",
        text: "The result under the clip",
      },
      {
        type: "p",
        text: "The score is not a rumor attached to the video. UEFA’s highlights list Denmark 2, Portugal 4. Portugal won without Ronaldo in the lineup, and the players backed Jesus afterward. Vitinha said the manager’s work is already obvious, and that it was too clear to miss. That is the squad’s account of a week otherwise consumed by who is not there.",
      },
      {
        type: "p",
        text: "The shove does not change the score. It explains the second wave of searches, the ones that are not asking who won. A forward on the losing team, identified in the coverage as a Ronaldo supporter, turned a greeting into a push. The video moved in Portuguese first and then outpaced the match report.",
      },
      {
        type: "h2",
        text: "One game, two queries",
      },
      {
        type: "p",
        text: "English-language search asks about Denmark and Portugal. This spelling asks about the same night and stops on Jesus. Both are the 4-2. One audience wants the goals. The other wants the hand that did not get shaken.",
      },
    ],
  },
  "japan-vs-ecuador": {
    headline: "Japan and Ecuador drew the first look: 0-0",
    dek: "It is a friendly, not a qualifier. The pages Americans opened showed a level score, plus the lineup, the channel and the stream.",
    card: "A friendly on American evening, level when the live pages loaded.",
    blocks: [
      {
        type: "p",
        text: "Japan against Ecuador is a friendly, and the live score those pages opened on was 0-0. That is the result the search is attached to right now: not a final that has been written up overnight, but a match in progress, or just frozen, at nil-nil, while people try to find it.",
      },
      {
        type: "h2",
        text: "The search is the broadcast",
      },
      {
        type: "p",
        text: "The rest of the query is logistics. Who is starting. Which channel has the game. Where it is streaming. A friendly does not move a World Cup table, and it can still own a half hour if kickoff overlaps with the American evening and the link is not obvious.",
      },
      {
        type: "p",
        text: "Japan and Ecuador are both teams people look up when a live soccer page is circulating, even in a match that does not count. The lineup is the other half of the search. Friendlies are where coaches try players, and the starting XI is often the only news the game produces if the score does not move.",
      },
      {
        type: "h2",
        text: "Treat 0-0 as a moment",
      },
      {
        type: "p",
        text: "A 0-0 on a live page is not a confirmed final. Friendlies move, and this one may already have. What the coverage driving the search actually showed, when those pages loaded, was Japan 0, Ecuador 0, plus a television guide. If you are opening it now, check the live line again. The search moved from the score that was on the screen.",
      },
    ],
  },
  "ray-kerr": {
    headline: "Ray Kerr threw 3 1/3 scoreless, and Atlanta ended the Phillies",
    dek: "He opened Game 3. Grant Holmes got the win, Chris Sale got the last four outs, and the Braves won 6-2.",
    card: "The opener on the night Philadelphia’s season ended.",
    blocks: [
      {
        type: "p",
        text: "Ray Kerr started Game 3 of the National League wild-card series for the Braves and threw 3 1/3 scoreless innings. Atlanta beat the Phillies 6-2 in Atlanta, won the series 2-1, and ended Philadelphia’s season. Kerr went into the night as an opener most people could not have named on Monday. He came out of it as a reason the series is over.",
      },
      {
        type: "h2",
        text: "Who did what on the mound",
      },
      {
        type: "p",
        text: "Kerr opened against Aaron Nola. Nola’s night was short. His command failed, and he took the loss. Grant Holmes got the win. Chris Sale, pitching on one day of rest, recorded the last four outs. The bullpen plan was not a secret beforehand. Holmes had been ticketed to pitch at some point in the elimination game. Kerr is the name that cleared the search list because he was the one who started.",
      },
      {
        type: "p",
        text: "The offense made the lead before the pitching had to protect a thin one. Michael Harris II hit a three-run homer in the first. Ozzie Albies hit a two-run homer in the fourth. Matt Olson added a solo shot in the seventh. The final was 6-2 at Truist Park.",
      },
      {
        type: "h2",
        text: "Why a reliever is the headline",
      },
      {
        type: "p",
        text: "Elimination games promote unfamiliar names when they pitch the first inning of a season-ender. Kerr did that and did not give up a run. Atlanta’s next series is against the Dodgers, opening Saturday in Los Angeles. His 3 1/3 innings are part of how the Phillies’ year stopped.",
      },
    ],
  },
  "who-won-big-brother": {
    headline: "Rick Devens won Big Brother 28",
    dek: "The Survivor alum beat Taylor Brown 6-1, took home $750,000, and was also named America’s Favorite Houseguest. He cut Drew Campbell to get there.",
    card: "Devens won, 6-1. He is the first Survivor player to win Big Brother.",
    blocks: [
      {
        type: "p",
        text: "Rick Devens won Big Brother season 28. The jury voted 6-1 for him over Taylor Brown on Thursday night’s CBS finale. He takes home the $750,000 grand prize. Brown, the runner-up, receives $75,000. Devens was also named America’s Favorite Houseguest, the fan vote that is a separate title from winning the game.",
      },
      {
        type: "h2",
        text: "How he made the final two",
      },
      {
        type: "p",
        text: "Devens, Brown and Drew Campbell were the final three. Devens won the last Head of Household competition, evicted Campbell, and took Brown to the end. He has said he thought he might have lost to Campbell. The vote says he did not lose to Brown. Six jurors chose him. One chose her.",
      },
      {
        type: "p",
        text: "It is the first time a Survivor player has won Big Brother. Devens competed on Survivor’s Edge of Extinction and on the show’s 50th season. He was not the only reality-television name in the house this year. He is the one who left with the title.",
      },
      {
        type: "h2",
        text: "The money, and the other vote",
      },
      {
        type: "p",
        text: "The $750,000 is the winner’s check. America’s Favorite is an additional fan prize, which is why some tallies of his night run higher once that vote and a smaller in-season prize are added. The fact the search is asking for is the name. The jury picked Rick Devens. The fans picked him too.",
      },
    ],
  },
  "trina-braxton": {
    headline: "Von Scales, Trina Braxton’s husband, has died at 58",
    dek: "The St. Louis native’s death is the news. Her name is the one people recognize, which is why the search is hers.",
    card: "A death at 58. The marriage is how the public knows him.",
    blocks: [
      {
        type: "p",
        text: "Von Scales, the husband of Trina Braxton, has died. He was 58. He was from St. Louis, which is the detail closest to the life being marked rather than the famous name in the search bar. The news is his death. The query says Trina Braxton because that is the name people know.",
      },
      {
        type: "h2",
        text: "What has been reported",
      },
      {
        type: "p",
        text: "The coverage agrees on the relationship, the age and the city. Scales was Braxton’s husband. He was 58. He was a St. Louis native. Those three facts are the story as it has been published. A cause of death has not been established in the headlines driving the search, and it should not be guessed.",
      },
      {
        type: "p",
        text: "Braxton is the singer whose last name turns a family death into a national query. That is how celebrity news works, and it is worth saying plainly so the subject does not get reversed. People are typing her name. The person who died is her husband.",
      },
      {
        type: "h2",
        text: "A short record, and a complete one",
      },
      {
        type: "p",
        text: "There is no second plot in what has been reported. A death, an age, a marriage, a hometown. That is enough for a name to trend. It does not need a cause invented to fill the space, and it does not need her career recited back to her on the day the coverage is about him.",
      },
    ],
  },
  "prime-video": {
    headline: "Prime Video’s Carrie is the series people are opening the app for",
    dek: "Mike Flanagan’s take on Stephen King’s novel is the show attached to the Prime Video search: a modern expansion that reviews praise, and also ask whether it needed to be longer.",
    card: "A Stephen King adaptation, a new argument, and the app name standing in for the show.",
    blocks: [
      {
        type: "p",
        text: "The Prime Video search is not a vague what’s-on. The series attached to it is Carrie, Mike Flanagan’s adaptation of Stephen King’s novel for Amazon. Reviews describe it as a modern expansion of the book: capable, freshly staged, and open to the charge that it did not need to be expanded at all.",
      },
      {
        type: "h2",
        text: "What the reviews agree on",
      },
      {
        type: "p",
        text: "The first reviews land in the same neighborhood from different directions. One calls it a fresh, modern take with strong performances. Another says Flanagan capably expands King’s horror classic and then asks whether that expansion was necessary. That argument, faithful enough to be recognizable and long enough to be questioned, is the one people are having on the way into the app.",
      },
      {
        type: "p",
        text: "Carrie is a story a large share of the audience already knows from the book or from an earlier film. A new version trends when it is easy to start and when critics disagree about whether the new length earns itself. Both of those are true of this one, which is why the service’s name is standing in for the title.",
      },
      {
        type: "h2",
        text: "If you typed the app",
      },
      {
        type: "p",
        text: "Opening Prime Video today is, in the coverage, a search for Flanagan’s Carrie rather than a tour of the homepage. The show is King’s novel, retold at series length, with the argument already attached: powerful where it is specific, and possibly longer than the story required.",
      },
    ],
  },
  verity: {
    headline: "Verity is Hathaway, Johnson, and a Colleen Hoover thriller",
    dek: "The movie is aiming at a $35 million opening. If it lands at number one, it would be Anne Hathaway’s third chart-topping film of the year. Early reviews call it campy, faithful, and not quite strange enough.",
    card: "A book people already argued about, now a movie with a number on it.",
    blocks: [
      {
        type: "p",
        text: "Verity is in theaters, which is why a one-word title is being searched like news. Anne Hathaway and Dakota Johnson lead a Colleen Hoover story played as a pulpy thriller, the two of them set against each other. The commercial bet, going into the weekend, is a $35 million debut.",
      },
      {
        type: "h2",
        text: "The box office, before the weekend is over",
      },
      {
        type: "p",
        text: "If Verity opens at number one, it would be Hathaway’s third chart-topping movie of the year. That is the industry frame, not a completed result. The same weekend’s other wide estimate is Digger, talked about as a possible $12 million disappointment. Verity is the film the tracking expects to win the frame. Tracking is a forecast. The gross arrives after the weekend.",
      },
      {
        type: "p",
        text: "Hoover’s readers already argued about the book. A film adaptation gives that argument a lobby and a runtime. The early reviews meet in one place from two directions. It is camp. It is faithful to the novel. More than one voice thinks it should have gotten weirder. Hathaway is the performance those reviews say carries it.",
      },
      {
        type: "h2",
        text: "What you are buying a ticket to",
      },
      {
        type: "p",
        text: "A pulpy thriller, two famous leads, a book people have already taken sides on, and a studio hoping $35 million is the floor of the conversation rather than the ceiling. That is the movie. The search is the title because the title is the whole pitch.",
      },
    ],
  },
  "amazon-ftc-settlement-payouts": {
    headline: "Amazon is sending the Prime settlement money",
    dek: "Payments from the $2.5 billion case are going out. The useful question is whether you qualify. The urgent one is which messages to ignore.",
    card: "Checks are going out. So are the scams pretending to be the checks.",
    blocks: [
      {
        type: "p",
        text: "Amazon has started sending payments from its $2.5 billion Prime settlement. The money is the news. Eligibility is the part every search is trying to settle on one screen: who qualifies, how the payment arrives, and what a real notice looks like.",
      },
      {
        type: "h2",
        text: "The payout, and the copycats",
      },
      {
        type: "p",
        text: "Refunds this well known attract imitations the same week they begin. Messages that tell you to click a link, hand over a password, or pay a fee to “release” a settlement check are the scam sitting next to the real mailing. A payment from this case does not need your Amazon password to exist.",
      },
      {
        type: "p",
        text: "Some people are owed money, and those payments are beginning to move. Millions of dollars are in the rollout. Everyone else is a possible target for a copy of the same announcement. The way to tell them apart is the case itself, not the urgency of the email.",
      },
      {
        type: "h2",
        text: "What to do with the notice",
      },
      {
        type: "p",
        text: "If you are eligible, the reporting says the payments are already being sent, which means the process does not depend on a stranger texting you a link. If you are not sure you qualify, that question is answerable from the settlement, not from a message that showed up because the settlement is famous. Match the notice to the case. Ignore the one that asks you to log in through a link you did not ask for.",
      },
    ],
  },
  "what-happened-to-chad-lowes-daughter": {
    headline: "Fiona Lowe, Chad Lowe’s daughter, died at 13",
    dek: "The Los Angeles County medical examiner ruled her death a suicide. She was pronounced dead at a hospital on September 29. She was the daughter of Chad Lowe and Kim Painter.",
    card: "A 13-year-old has died. The medical examiner says it was suicide.",
    blocks: [
      {
        type: "p",
        text: "Fiona Hepler Lowe, the 13-year-old daughter of actor Chad Lowe and producer Kim Painter, died on September 29. She was pronounced dead at a Los Angeles hospital. On October 1, the Los Angeles County medical examiner ruled the manner of death a suicide.",
      },
      {
        type: "h2",
        text: "What her parents said",
      },
      {
        type: "p",
        text: "Lowe and Painter announced their daughter’s death the day she died. They called her the light of their lives and asked for prayers and privacy. In that statement they also pointed anyone who is struggling toward a suicide-prevention lifeline. In the United States, that line is 988.",
      },
      {
        type: "p",
        text: "Fiona was the middle of three daughters. Her sisters are Mabel and Nixie. Her father, 58, is an Emmy-winning actor and director, the younger brother of Rob Lowe, known for Life Goes On. He and Painter married in 2010. A school principal wrote to parents that a student had died and did not name the student. None of the biography is a substitute for the medical examiner’s ruling.",
      },
      {
        type: "h2",
        text: "The fact, and the limit of it",
      },
      {
        type: "p",
        text: "She was 13. She died at a hospital on September 29. The manner of death has been ruled a suicide. That is the public answer to the question people are typing. How it happened does not need to be repeated for the answer to be accurate, and it does not belong in a story about a child.",
      },
    ],
  },
  ...OCTOBER_3,
};
