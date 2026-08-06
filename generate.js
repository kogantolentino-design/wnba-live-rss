import RSS from "rss";
import fs from "fs";

const url =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard";

const data = await fetch(url).then(r => r.json());

const feed = new RSS({
  title: "WNBA Live Scores",
  description: "Live WNBA Score Feed",
  feed_url: "feed_url: "https://kogantolentino-design.github.io/wnba-live-rss/feed.xml",,
  site_url: "https://www.wnba.com"
});

for (const game of data.events) {
  const comp = game.competitions[0];

  const home = comp.competitors.find(c => c.homeAway === "home");
  const away = comp.competitors.find(c => c.homeAway === "away");

  feed.item({
    title: `${away.team.displayName} ${away.score} - ${home.score} ${home.team.displayName}`,
    description: game.status.type.detail,
    date: new Date(game.date)
  });
}

fs.writeFileSync("feed.xml", feed.xml({ indent: true }));
