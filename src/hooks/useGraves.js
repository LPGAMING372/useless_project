import { useCallback, useEffect, useMemo, useState } from "react";
import { EXAMPLE_GRAVES, STARTING_COUNTER } from "../data/exampleGraves";
import { judgeIdea } from "../utils/judgment";
import {
  loadGraves,
  saveGraves,
  loadCounter,
  saveCounter,
  recordSubmissionTimestamp,
} from "../utils/storage";

function makeId() {
  return `grave-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useGraves() {
  const [graves, setGraves] = useState(() => loadGraves() ?? EXAMPLE_GRAVES);
  const [counter, setCounter] = useState(() => loadCounter() || STARTING_COUNTER);
  const [rapidSubmissionNotice, setRapidSubmissionNotice] = useState(false);

  useEffect(() => {
    saveGraves(graves);
  }, [graves]);

  useEffect(() => {
    saveCounter(counter);
  }, [counter]);

  const buryIdea = useCallback(
    ({ title, description }) => {
      const judgment = judgeIdea({ title, description });
      const nextNumber = counter + 1;
      const now = new Date().toISOString();

      const grave = {
        id: makeId(),
        number: nextNumber,
        title: title.trim() || "Untitled Idea",
        description: description.trim(),
        bornDate: now,
        diedDate: now,
        status: "dead",
        views: 0,
        isExample: false,
        ...judgment,
      };

      setGraves((prev) => [grave, ...prev]);
      setCounter(nextNumber);

      const recentCount = recordSubmissionTimestamp();
      setRapidSubmissionNotice(recentCount >= 3);

      return grave;
    },
    [counter]
  );

  const resurrectGrave = useCallback((id) => {
    setGraves((prev) =>
      prev.map((grave) =>
        grave.id === id ? { ...grave, status: "alive", resurrectedAt: new Date().toISOString() } : grave
      )
    );
  }, []);

  const registerView = useCallback((id) => {
    setGraves((prev) =>
      prev.map((grave) => (grave.id === id ? { ...grave, views: grave.views + 1 } : grave))
    );
  }, []);

  const clearRapidSubmissionNotice = useCallback(() => setRapidSubmissionNotice(false), []);

  const stats = useMemo(() => {
    if (graves.length === 0) {
      return {
        total: 0,
        totalRegrets: 0,
        averageUselessness: 0,
        mostCommonCause: "\u2014",
        mostUseless: null,
        longestRested: null,
        resurrectedCount: 0,
      };
    }

    const deadGraves = graves.filter((g) => g.status === "dead");
    const totalRegrets = graves.length;
    const resurrectedCount = graves.filter((g) => g.status === "alive").length;

    const averageUselessness = Math.round(
      graves.reduce((sum, g) => sum + g.uselessness, 0) / graves.length
    );

    const causeCounts = graves.reduce((acc, g) => {
      acc[g.causeOfDeath] = (acc[g.causeOfDeath] || 0) + 1;
      return acc;
    }, {});
    const mostCommonCause = Object.entries(causeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "\u2014";

    const mostUseless = [...graves].sort((a, b) => b.uselessness - a.uselessness)[0] ?? null;

    const longestRested =
      deadGraves.length > 0
        ? [...deadGraves].sort((a, b) => new Date(a.diedDate) - new Date(b.diedDate))[0]
        : null;

    return {
      total: deadGraves.length,
      totalRegrets,
      averageUselessness,
      mostCommonCause,
      mostUseless,
      longestRested,
      resurrectedCount,
    };
  }, [graves]);

  return {
    graves,
    buryIdea,
    resurrectGrave,
    registerView,
    stats,
    rapidSubmissionNotice,
    clearRapidSubmissionNotice,
  };
}
