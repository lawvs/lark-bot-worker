// Ported from [excaliburhan/node-gitlab-webhook](https://github.com/excaliburhan/node-gitlab-webhook/blob/master/index.d.ts)
// Licensed under the MIT License.
//
// See [Webhook events | GitLab](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html)

export interface PushEvent {
  object_kind: "push";
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_username: string;
  user_email: string;
  user_avatar: string;
  project_id: number;
  project: Project;
  repository: Repository;
  commits: Commit[];
  total_commits_count: number;
}

export interface TagPushEvent {
  object_kind: "tag_push";
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_avatar: string;
  project_id: number;
  project: Project;
  repository: Repository;
  commits: Commit[];
  total_commits_count: number;
}

export interface IssueEvent {
  object_kind: "issue";
  user: User;
  project: Project;
  repository: Repository;
  object_attributes: IssueAttributes;
  assignees: User[];
  assignee: User;
  labels: Label[];
  changes: Changes;
}

export interface IssueAttributes {
  id: number;
  title: string;
  assignee_ids: number[];
  assignee_id: number;
  author_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  position: number;
  branch_name: string;
  description: string;
  milestone_id: number;
  state: string;
  iid: number;
  url: string;
  action: string;
}

export interface NoteEvent {
  object_kind: "note";
  user: User;
  project_id: number;
  project: Project;
  repository: Repository;
  object_attributes: NoteAttributes;
  commit?: Commit;
  merge_request?: MergeRequest;
  issue?: Issue;
  snippet?: Snippet;
}

export type CommentEvent = NoteEvent;

export interface NoteAttributes {
  id: number;
  note: string;
  noteable_type: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  project_id: number;
  attachment: any;
  line_code: string;
  commit_id: string;
  noteable_id: number;
  system: boolean;
  st_diff: StDiff;
  url: string;
  description?: string;
}

export interface MergeRequestEvent {
  object_kind: "merge_request";
  user: User;
  project: Project;
  repository: Repository;
  object_attributes: MergeRequestAttributes;
  labels: Label[];
  changes: Changes;
}

export interface MergeRequestAttributes {
  id: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  assignee_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: null;
  state: string;
  merge_status: string;
  target_project_id: number;
  iid: number;
  description: string;
  source: Project;
  target: Project;
  last_commit: LastCommit;
  work_in_progress: boolean;
  url: string;
  action: string;
  assignee: User;
}

export interface WikiPageEvent {
  object_kind: "wiki_page";
  user: User;
  project: Project;
  wiki: Wiki;
  object_attributes: WikiPageAttributes;
}

export interface WikiPageAttributes {
  title: string;
  content: string;
  format: string;
  message: string;
  slug: string;
  url: string;
  action: string;
}

export interface PipelineEvent {
  object_kind: "pipeline";
  object_attributes: PipelineAttributes;
  user: User;
  project: Project;
  commit: Commit;
  builds: Build[];
}

export interface PipelineAttributes {
  id: number;
  ref: string;
  tag: boolean;
  sha: string;
  before_sha: string;
  status: string;
  stages: string[];
  created_at: string;
  finished_at: string;
  duration: number;
}

export interface BuildEvent {
  object_kind: "build";
  ref: string;
  tag: boolean;
  before_sha: string;
  sha: string;
  build_id: number;
  build_name: string;
  build_stage: string;
  build_status: string;
  build_started_at: string;
  build_finished_at: string;
  build_duration: any;
  build_allow_failure: boolean;
  project_id: number;
  project_name: string;
  user: User;
  commit: Commit;
  repository: Repository;
}

export type JobEvent = BuildEvent;

export interface StDiff {
  diff: string;
  new_path: string;
  old_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
}

export interface Issue {
  id: number;
  title: string;
  assignee_ids: number[];
  assignee_id: number;
  author_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  position: number;
  branch_name: string;
  description: string;
  milestone_id: number;
  state: string;
  iid: number;
}

export interface Snippet {
  id: number;
  title: string;
  content: string;
  author_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  expires_at: string;
  type: string;
  visibility_level: number;
}

export interface Commit {
  id: string;
  message: string;
  timestamp: string;
  url: string;
  author: Author;
}

export interface Build {
  id: number;
  stage: string;
  name: string;
  status: string;
  created_at: string;
  started_at?: string;
  finished_at?: string;
  when: string;
  manual: boolean;
  user: User;
  runner: any;
  artifacts_file: ArtifactsFile;
}

export interface ArtifactsFile {
  filename: string;
  size: number;
}

export interface Label {
  id: number;
  title: string;
  color: string;
  project_id: number;
  created_at: string;
  updated_at: string;
  template: boolean;
  description: string;
  type: string;
  group_id: number;
}

export interface Changes {
  updated_by_id: number[];
  updated_at: string[];
  labels: Labels;
}

export interface Labels {
  previous: Label[];
  current: Label[];
}

export interface MergeRequest {
  id: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  assignee_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: number;
  state: string;
  merge_status: string;
  target_project_id: number;
  iid: number;
  description: string;
  position: number;
  source: Project;
  target: Project;
  last_commit: LastCommit;
  work_in_progress: boolean;
  assignee: User;
}

export interface User {
  name: string;
  username: string;
  avatar_url: string;
}

export interface LastCommit {
  id: string;
  message: string;
  timestamp: string;
  url: string;
  author: Author;
}

export interface Author {
  name: string;
  email: string;
}

export interface Project {
  name: string;
  description: string;
  web_url: string;
  avatar_url: string;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
  id?: number;
}

export interface Repository {
  name: string;
  url: string;
  description: string;
  homepage: string;
}

export interface Wiki {
  web_url: string;
  git_ssh_url: string;
  git_http_url: string;
  path_with_namespace: string;
  default_branch: string;
}

export interface DeploymentEvent {
  object_kind: "deployment";
  // TODO
}

export interface GroupMemberEvent {
  // TODO
}

export interface SubgroupEvent {
  // TODO
}

export interface SubgroupEvent {
  // TODO
}

export interface FeatureFlagEvent {
  object_kind: "feature_flag";
  // TODO
}

export interface ReleaseEvent {
  object_kind: "release";
  // TODO
}

export type WebhookEvents =
  | PushEvent
  | TagPushEvent
  | IssueEvent
  | NoteEvent
  | MergeRequestEvent
  | WikiPageEvent
  | PipelineEvent
  | BuildEvent
  | DeploymentEvent
  | GroupMemberEvent
  | SubgroupEvent
  | FeatureFlagEvent
  | ReleaseEvent;
