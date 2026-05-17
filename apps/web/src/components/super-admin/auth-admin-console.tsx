"use client";

import { useMutation } from "convex/react";
import { Ban, KeyRound, RefreshCw, Search, Shield, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { api } from "../../../convex/_generated/api";

type FlikRole = "user" | "staff" | "super_admin";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role?: string | string[] | null;
  banned?: boolean | null;
  banReason?: string | null;
}

interface AdminSession {
  id: string;
  token: string;
  userId: string;
  createdAt: Date | string;
  expiresAt: Date | string;
  impersonatedBy?: string | null;
}

interface ApiResult<T> {
  data?: T | null;
  error?: { message?: string } | null;
}

interface AdminApi {
  listUsers(input: {
    query?: {
      limit?: number;
      offset?: number;
      searchField?: "email" | "name";
      searchOperator?: "contains";
      searchValue?: string;
      sortBy?: string;
      sortDirection?: "asc" | "desc";
    };
  }): Promise<ApiResult<{ total: number; users: AdminUser[] }>>;
  createUser(input: {
    email: string;
    name: string;
    password?: string;
    role?: FlikRole;
  }): Promise<ApiResult<{ user: AdminUser }>>;
  updateUser(input: {
    userId: string;
    data: { email?: string; name?: string };
  }): Promise<ApiResult<AdminUser>>;
  setRole(input: {
    userId: string;
    role: FlikRole;
  }): Promise<ApiResult<{ user: AdminUser }>>;
  banUser(input: {
    userId: string;
    banReason?: string;
  }): Promise<ApiResult<{ user: AdminUser }>>;
  unbanUser(input: { userId: string }): Promise<ApiResult<{ user: AdminUser }>>;
  listUserSessions(input: {
    userId: string;
  }): Promise<ApiResult<{ sessions: AdminSession[] }>>;
  revokeUserSession(input: {
    sessionToken: string;
  }): Promise<ApiResult<{ success: boolean }>>;
  revokeUserSessions(input: {
    userId: string;
  }): Promise<ApiResult<{ success: boolean }>>;
  impersonateUser(input: {
    userId: string;
  }): Promise<ApiResult<{ user: AdminUser }>>;
  setUserPassword(input: {
    userId: string;
    newPassword: string;
  }): Promise<ApiResult<{ status: boolean }>>;
  removeUser(input: {
    userId: string;
  }): Promise<ApiResult<{ success: boolean }>>;
}

interface Confirmation {
  title: string;
  description: string;
  actionLabel: string;
  run: () => Promise<void>;
}

const roles: FlikRole[] = ["user", "staff", "super_admin"];

function getRoleLabel(role?: string | string[] | null) {
  const value = Array.isArray(role) ? role.join(", ") : role || "user";
  return value.replaceAll("_", " ");
}

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AuthAdminConsole() {
  const adminApi = useMemo(() => authClient.admin as AdminApi, []);
  const syncMyBetterAuthRole = useMutation(api.profiles.syncMyBetterAuthRole);
  const mirrorProfileRole = useMutation(api.profiles.updateUserRole);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [createForm, setCreateForm] = useState({
    email: "",
    name: "",
    password: "",
    role: "user" as FlikRole,
  });
  const [updateForm, setUpdateForm] = useState({ email: "", name: "" });
  const [roleForm, setRoleForm] = useState<FlikRole>("user");
  const [password, setPassword] = useState("");
  const [banReason, setBanReason] = useState("");

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, users]
  );

  const refreshUsers = useCallback(async () => {
    setLoading(true);
    try {
      await syncMyBetterAuthRole({});
      const result = await adminApi.listUsers({
        query: {
          limit: 100,
          offset: 0,
          searchField: searchValue.trim() ? "email" : undefined,
          searchOperator: searchValue.trim() ? "contains" : undefined,
          searchValue: searchValue.trim() || undefined,
          sortBy: "createdAt",
          sortDirection: "desc",
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Could not load users");
        return;
      }

      const nextUsers = result.data?.users ?? [];
      setUsers(nextUsers);
      setSelectedUserId((current) => current ?? nextUsers[0]?.id ?? null);
    } finally {
      setLoading(false);
    }
  }, [adminApi, searchValue, syncMyBetterAuthRole]);

  const refreshSessions = useCallback(
    async (userId = selectedUserId) => {
      if (!userId) {
        setSessions([]);
        return;
      }

      const result = await adminApi.listUserSessions({ userId });
      if (result.error) {
        toast.error(result.error.message || "Could not load sessions");
        return;
      }

      setSessions(result.data?.sessions ?? []);
    },
    [adminApi, selectedUserId]
  );

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setUpdateForm({ email: selectedUser.email, name: selectedUser.name });
    setRoleForm((selectedUser.role as FlikRole | undefined) ?? "user");
    refreshSessions(selectedUser.id);
  }, [refreshSessions, selectedUser]);

  const runAdminAction = async (
    action: () => Promise<ApiResult<unknown> | undefined>,
    successMessage: string
  ) => {
    const result = await action();
    if (result?.error) {
      toast.error(result.error.message || "Action failed");
      return;
    }

    toast.success(successMessage);
    await refreshUsers();
    await refreshSessions();
  };

  const ask = (nextConfirmation: Confirmation) => {
    setConfirmation(nextConfirmation);
  };

  const createUser = () =>
    ask({
      actionLabel: "Create user",
      description: `Create ${createForm.email} with the ${getRoleLabel(
        createForm.role
      )} role.`,
      title: "Create this user?",
      run: async () => {
        await runAdminAction(
          () =>
            adminApi.createUser({
              email: createForm.email.trim(),
              name: createForm.name.trim(),
              password: createForm.password || undefined,
              role: createForm.role,
            }),
          "User created"
        );
      },
    });

  const updateUser = async () => {
    if (!selectedUser) {
      return;
    }

    await runAdminAction(
      () =>
        adminApi.updateUser({
          data: {
            email: updateForm.email.trim(),
            name: updateForm.name.trim(),
          },
          userId: selectedUser.id,
        }),
      "User updated"
    );
  };

  const setRole = () => {
    if (!selectedUser) {
      return;
    }

    ask({
      actionLabel: "Set role",
      description: `Set ${selectedUser.email} to ${getRoleLabel(roleForm)}. This also mirrors the role to Convex profiles for current guards.`,
      title: "Change this role?",
      run: async () => {
        await runAdminAction(async () => {
          const result = await adminApi.setRole({
            role: roleForm,
            userId: selectedUser.id,
          });
          if (!result.error) {
            await mirrorProfileRole({
              role: roleForm,
              userId: selectedUser.id,
            });
          }
          return result;
        }, "Role updated");
      },
    });
  };

  const banUser = () => {
    if (!selectedUser) {
      return;
    }

    ask({
      actionLabel: "Ban user",
      description: `Ban ${selectedUser.email}. They will not be able to sign in while banned.`,
      title: "Ban this user?",
      run: async () => {
        await runAdminAction(
          () =>
            adminApi.banUser({
              banReason: banReason.trim() || undefined,
              userId: selectedUser.id,
            }),
          "User banned"
        );
      },
    });
  };

  const unbanUser = async () => {
    if (!selectedUser) {
      return;
    }

    await runAdminAction(
      () => adminApi.unbanUser({ userId: selectedUser.id }),
      "User unbanned"
    );
  };

  const setUserPassword = () => {
    if (!selectedUser) {
      return;
    }

    ask({
      actionLabel: "Set password",
      description: `Replace the password for ${selectedUser.email}.`,
      title: "Set a new password?",
      run: async () => {
        await runAdminAction(
          () =>
            adminApi.setUserPassword({
              newPassword: password,
              userId: selectedUser.id,
            }),
          "Password updated"
        );
        setPassword("");
      },
    });
  };

  const impersonateUser = () => {
    if (!selectedUser) {
      return;
    }

    ask({
      actionLabel: "Impersonate",
      description: `Start a temporary impersonation session for ${selectedUser.email}.`,
      title: "Impersonate this user?",
      run: async () => {
        await runAdminAction(
          () => adminApi.impersonateUser({ userId: selectedUser.id }),
          "Impersonation started"
        );
      },
    });
  };

  const removeUser = () => {
    if (!selectedUser) {
      return;
    }

    ask({
      actionLabel: "Delete user",
      description: `Delete ${selectedUser.email}. This action is destructive.`,
      title: "Delete this user?",
      run: async () => {
        await runAdminAction(
          () => adminApi.removeUser({ userId: selectedUser.id }),
          "User deleted"
        );
        setSelectedUserId(null);
      },
    });
  };

  const revokeSession = (session: AdminSession) =>
    ask({
      actionLabel: "Revoke session",
      description: `Revoke the session created ${formatDate(session.createdAt)}.`,
      title: "Revoke this session?",
      run: async () => {
        await runAdminAction(
          () => adminApi.revokeUserSession({ sessionToken: session.token }),
          "Session revoked"
        );
      },
    });

  const revokeAllSessions = () => {
    if (!selectedUser) {
      return;
    }

    ask({
      actionLabel: "Revoke all",
      description: `Sign ${selectedUser.email} out everywhere.`,
      title: "Revoke all sessions?",
      run: async () => {
        await runAdminAction(
          () => adminApi.revokeUserSessions({ userId: selectedUser.id }),
          "All sessions revoked"
        );
      },
    });
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
      <Card className="overflow-hidden p-0">
        <div className="flex flex-col gap-3 border-border/30 border-b p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search by email"
              value={searchValue}
            />
          </div>
          <Button disabled={loading} onClick={refreshUsers} variant="outline">
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>
        <div className="divide-y divide-border/30">
          {users.map((user) => (
            <button
              className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-3 text-left transition hover:bg-muted/60 data-[selected=true]:bg-muted"
              data-selected={user.id === selectedUserId}
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              type="button"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium text-sm">
                  {user.name || "Unnamed user"}
                </span>
                <span className="block truncate text-muted-foreground text-xs">
                  {user.email}
                </span>
              </span>
              <span className="flex items-center gap-2">
                {user.banned ? (
                  <Badge variant="destructive">Banned</Badge>
                ) : null}
                <Badge variant="secondary">{getRoleLabel(user.role)}</Badge>
              </span>
            </button>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-base">Create User</h3>
          <div className="mt-4 grid gap-3">
            <Input
              onChange={(event) =>
                setCreateForm((form) => ({ ...form, name: event.target.value }))
              }
              placeholder="Name"
              value={createForm.name}
            />
            <Input
              onChange={(event) =>
                setCreateForm((form) => ({
                  ...form,
                  email: event.target.value,
                }))
              }
              placeholder="Email"
              type="email"
              value={createForm.email}
            />
            <Input
              onChange={(event) =>
                setCreateForm((form) => ({
                  ...form,
                  password: event.target.value,
                }))
              }
              placeholder="Temporary password"
              type="password"
              value={createForm.password}
            />
            <Select
              onValueChange={(value) =>
                setCreateForm((form) => ({
                  ...form,
                  role: value as FlikRole,
                }))
              }
              value={createForm.role}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {getRoleLabel(role)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={createUser}>
              <Shield className="size-4" />
              Create
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-base">Selected User</h3>
          {selectedUser ? (
            <div className="mt-4 grid gap-4">
              <div className="grid gap-3">
                <Label>Name</Label>
                <Input
                  onChange={(event) =>
                    setUpdateForm((form) => ({
                      ...form,
                      name: event.target.value,
                    }))
                  }
                  value={updateForm.name}
                />
                <Label>Email</Label>
                <Input
                  onChange={(event) =>
                    setUpdateForm((form) => ({
                      ...form,
                      email: event.target.value,
                    }))
                  }
                  type="email"
                  value={updateForm.email}
                />
                <Button onClick={updateUser} variant="outline">
                  Update user
                </Button>
              </div>

              <div className="grid gap-3">
                <Label>Role</Label>
                <Select
                  onValueChange={(value) => setRoleForm(value as FlikRole)}
                  value={roleForm}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {getRoleLabel(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={setRole} variant="outline">
                  Set role
                </Button>
              </div>

              <div className="grid gap-3">
                <Label>Ban reason</Label>
                <Textarea
                  onChange={(event) => setBanReason(event.target.value)}
                  placeholder="Policy violation, chargeback risk, etc."
                  value={banReason}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={banUser} variant="destructive">
                    <Ban className="size-4" />
                    Ban
                  </Button>
                  <Button onClick={unbanUser} variant="outline">
                    Unban
                  </Button>
                </div>
              </div>

              <div className="grid gap-3">
                <Label>New password</Label>
                <Input
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  value={password}
                />
                <Button onClick={setUserPassword} variant="outline">
                  <KeyRound className="size-4" />
                  Set password
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={impersonateUser} variant="outline">
                  Impersonate
                </Button>
                <Button onClick={removeUser} variant="destructive">
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-muted-foreground text-sm">
              Select a user to manage their account.
            </p>
          )}
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-base">Sessions</h3>
            <Button
              disabled={!selectedUser}
              onClick={revokeAllSessions}
              size="sm"
              variant="outline"
            >
              Revoke all
            </Button>
          </div>
          <div className="mt-4 grid gap-2">
            {sessions.map((session) => (
              <div
                className="rounded-md border border-border/60 p-3 text-sm"
                key={session.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate font-medium">{session.id}</span>
                  <Button
                    onClick={() => revokeSession(session)}
                    size="sm"
                    variant="outline"
                  >
                    Revoke
                  </Button>
                </div>
                <p className="mt-1 text-muted-foreground text-xs">
                  Expires {formatDate(session.expiresAt)}
                </p>
                {session.impersonatedBy ? (
                  <Badge className="mt-2" variant="warning">
                    Impersonated
                  </Badge>
                ) : null}
              </div>
            ))}
            {sessions.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No active sessions found.
              </p>
            ) : null}
          </div>
        </Card>
      </div>

      <AlertDialog
        onOpenChange={(open) => {
          if (!open) {
            setConfirmation(null);
          }
        }}
        open={Boolean(confirmation)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmation?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmation?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                confirmation?.run();
              }}
            >
              {confirmation?.actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
