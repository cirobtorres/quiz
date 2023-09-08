export const configs = {
  urls: {
    ROOT: "http://127.0.0.1:8000" as string,
    QUIZ: "http://127.0.0.1:8000/api/quiz/quiz-list" as string,
    QUESTIONS: "http://127.0.0.1:8000/api/quiz/question" as string,
    SCORE: "http://127.0.0.1:8000/api/quiz/score" as string,
    RANKING: "http://127.0.0.1:8000/api/user/ranking" as string,
    user: {
      RETRIEVE: "http://127.0.0.1:8000/api/user/retrieve-data" as string,
      RETRIEVE_AVATAR:
        "http://127.0.0.1:8000/api/user/retrieve-avatar" as string,
      LOGOUT: "http://127.0.0.1:8000/api/user/logout" as string,
      REGISTER: "http://127.0.0.1:8000/api/user/register" as string,
      UPDATE: "http://127.0.0.1:8000/api/user/update" as string,
    },
    token: {
      ACCESS: "http://127.0.0.1:8000/api/token/access" as string,
      REFRESH: "http://127.0.0.1:8000/api/token/refresh" as string,
    },
  },
  routers: {
    HOME: "/" as string,
    questionary: {
      ROOT: "/questionario" as string,
      SCORE: "/questionario/score" as string,
    },
    configQuiz: {
      ROOT: "/configurar-quiz" as string,
      CREATE_QUIZ: "/configurar-quiz/criar-quiz" as string,
    },
    RANKING: "/ranking" as string,
    user: {
      ROOT: "/usuario" as string,
      REGISTER: "/usuario/criar-conta" as string,
      LOGIN: "/usuario/entrar" as string,
    },
  },
  cookies: {
    EXPIRES: 7 as number,
  },
};
