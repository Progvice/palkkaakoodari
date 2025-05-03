import { Team } from "../../types";
import api, { parseAxiosError } from "../api";
import { authPaths as paths } from "../routes";

export const addTeam = async (team: Partial<Team>) => {
  try {
    const response = await api.post(paths.teams, team);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const modifyTeam = async (team: Partial<Team>) => {
  try {
    await api.put(paths.teams + "/" + team.id, team);
  } catch (error) {
    parseAxiosError(error);
  }
};

export const deleteTeam = async (team: Team) => {
  try {
    await api.delete(paths.teams + "/" + team.id);
  } catch (error) {
    parseAxiosError(error);
  }
};

export const getTeams = async () => {
  try {
    const response = await api.get(paths.teams);
    return response.data;
  } catch (error) {
    parseAxiosError(error);
  }
};

export const getTeam = async (teamId: number) : Promise<Team[]> => {
  console.log('asdasd');
  const res = await api.get<Team[]>(`${paths.teams}/${teamId}`);
  console.log(res);
  return res?.data ? res.data : [];
};

export const searchTeams = async (q: string) : Promise<Team[]> => {
  const res = await api.get<Team[]>(paths.teams, {params: {q: q}});
  return res?.data ? res.data : [];
}
