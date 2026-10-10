import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PaneManagerService } from '@shared/pane-manager.service';



function isSiblingPaneSwitch(urlx: string[], urly: string[]) {
  if (urlx.length !== urly.length) {
    return false;
  }

  const arePathsTheSame = Array(urlx.length).fill(false).map((_, i) => {
    return urlx[i] === urly[i];
  });

  return arePathsTheSame[0] && arePathsTheSame.at(-1);
}

function primarySegments(routeSnapshot: ActivatedRouteSnapshot) {
  let snapshot: ActivatedRouteSnapshot | null = routeSnapshot;
  let url = [];
  while (snapshot !== null) {
    url.push(...snapshot.url.map(urlx => urlx.path));
    snapshot = snapshot.firstChild || null;
  }
  return url;
}



export function canDeactivateCalculator(
  _: any,
  __: any,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
)  {
  const pane = inject(PaneManagerService);

  const nextUpIsAPane = isSiblingPaneSwitch(
    primarySegments(currentState.root),
    primarySegments(nextState.root)
  );

  if (nextUpIsAPane) {
    pane.openPane();
    return currentState.url !== nextState.url;
  }

  return pane.close();
}