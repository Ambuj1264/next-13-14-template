import { GET_SCHEDULE_POST } from "@/lib/graphql/queries/getSchdeulePosts";
import { GET_TEAMS } from "@/lib/graphql/queries/getTeams";
import {
  ActionProps,
  IScheduler,
  SchedulePostProp,
  TeamsProp,
} from "@/types/global";
import { calenderName } from "@/utils/constant";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { ScheduledContextContainer } from "./scheduledContext";

interface Event {
  date: string;
}

function ScheduledContextProvider({ children }: PropsWithChildren) {
  const [fetchPosts, { data, refetch }] = useLazyQuery(GET_SCHEDULE_POST);
  const { data: teamsData, refetch: teamsDataRefetch } = useQuery(GET_TEAMS, {
    fetchPolicy: "network-only",
  });
  const [calenderType, setCalenderType] = useState<string>(calenderName.Weekly);
  const [editorState, setEditorState] = useState({ editorHtml: "" });
  const [editorErr, setEditorError] = useState<null | string>(null);
  const [postactionType, setPostactionType] = useState<ActionProps>({
    isPreview: false,
    isComment: false,
  });
  const [onSecheduleOpen, setOnScheduleOpen] = useState(false);
  const [weeklyDates, setWeeklyDates] = useState<Event[]>([]);
  const handleScheduleType = (value: string) => {
    setCalenderType(value);
  };
  const handleSetWeeklyDates = (dates: Event[]) => {
    setWeeklyDates(dates);
  };
  const handleSetOnScheduleOpen = (value: boolean) => {
    setOnScheduleOpen(value);
  };
  const handleScheduleActions = (name: keyof ActionProps, value: boolean) => {
    Object.keys(postactionType).forEach((item) => {
      if (item === name) {
        postactionType[item] = value;
      } else {
        postactionType[item] = false;
      }
    });
    setPostactionType({ ...postactionType });
  };

  const getEditorErr = (value: string) => {
    const err = value === "<p><br></p>" || value === "";
    setEditorError(err ? "This field cannot be empty" : null);
    return err;
  };

  const searchPosts = (value = "") => {
    fetchPosts({ variables: { search: value } });
  };

  useEffect(() => {
    searchPosts();
  }, []);

  const filteredData = useMemo(() => {
    const { posts } = data ?? {};
    const filterValue = posts?.edges?.map(
      ({ node }: { node: SchedulePostProp }) => ({ ...node }),
    );
    return filterValue ?? [];
  }, [data]);
  const filteredTeams = useMemo(() => {
    const { teams } = teamsData ?? {};
    const filterValue = teams?.edges?.map(({ node }: { node: TeamsProp }) => ({
      ...node,
    }));
    return filterValue ?? [];
  }, [teamsData]);
  const contextValues: IScheduler = {
    calenderType,
    editorState,
    editorErr,
    weeklyDates,
    onSecheduleOpen,
    postactionType,
    filteredTeams,
    filteredData,
    handleScheduleActions,
    setEditorState,
    handleScheduleType,
    handleSetWeeklyDates,
    setEditorError,
    getEditorErr,
    handleSetOnScheduleOpen,
    refetch,
    teamsDataRefetch,
    searchPosts,
  };

  return (
    <ScheduledContextContainer value={contextValues}>
      {children}
    </ScheduledContextContainer>
  );
}

export default ScheduledContextProvider;
