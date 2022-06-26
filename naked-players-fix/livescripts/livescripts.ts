/// fix naked bug
const X_RAY_SPECS = 54844

function NakedBugFix (player: TSPlayer) {
  player.AddNamedTimer('naked-fix-start', 1, 1, 0, (o, t) => {
    const p = o.ToPlayer()
    p.AddAura(X_RAY_SPECS, p)
  })
  player.AddNamedTimer('naked-fix-stop', 50, 1, 0, (o, t) => {
    const p = o.ToPlayer()
    p.RemoveAura(X_RAY_SPECS)
  })
}

function Main (events: TSEvents) {
  events.Player.OnLogin(player => NakedBugFix(player))
  events.Player.OnMapChanged(player => NakedBugFix(player))
}
