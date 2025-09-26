import { request } from "./generic.api";

export const loginAdmin = ({ data }) => request({ url: "/login", data });
//VISA REQUESTS
export const getVisaRequests = ({ limit, page, eventId }) =>
  request({
    url: `/visa-request?limit=${limit | ""}&page=${page || 1}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const getVisaRequest = ({ id }) =>
  request({ url: `/visa-request/${id}`, method: "GET" });

export const deleteVisaRequest = ({ id }) =>
  request({ url: `/visa-request/delete/${id}` });
//END VISA REQUESTS
//TRANSFER REQUEST
export const getTransferRequests = ({ limit, page, eventId }) =>
  request({
    url: `/transfer-request?limit=${limit | ""}&page=${page || 1}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const addTransferRequest = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/transfer-request" : `/transfer-request/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const getTransferRequest = ({ id }) =>
  request({ url: `/transfer-request/${id}`, method: "GET" });

export const deleteTransferRequest = ({ id }) =>
  request({ url: `/transfer-request/delete/${id}` });
//END TRANSFER REQUEST
//ONBOARDINGS
export const getOnboardings = ({ limit, page }) =>
  request({
    url: `/onboardings?limit=${limit | ""}&page=${page || 1}`,
    method: "GET",
  });
export const getOnboarding = ({ id }) =>
  request({ url: `/onboardings/${id}`, method: "GET" });

export const addOnboarding = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/onboardings" : `/onboardings/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteOnboarding = ({ id }) =>
  request({ url: `/onboardings/delete/${id}` });
export const uploadOnboarding = ({ data, id }) =>
  request({ url: `/onboardings/image/${id}`, data, file: true });
//END ONBOARDINGS
//APP CONFIG
export const getAppConfig = () =>
  request({ url: `/app-config/`, method: "GET" });
export const editAppConfig = ({ data }) =>
  request({
    url: `/app-config/`,
    data,
    method: `PATCH`,
  });
export const uploadAppImage = ({ data }) =>
  request({ url: `/app-config/logo`, data, file: true });
export const uploadAppBanner = ({ data }) =>
  request({ url: `/app-config/banner`, data, file: true });
//END APP CONFIG
// CHATROOMS USERS
export const getChatroomsUsers = ({
  id,
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/chatroom-users/${id}?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getChatroomUser = ({ id }) =>
  request({ url: `/chatroom-users/${id}`, method: "GET" });

export const addChatroomUser = ({ data, id }) =>
  request({
    url: "/chatroom-users",
    data,
    method: `POST`,
  });
export const deleteChatroomUser = ({ data }) =>
  request({ url: `/chatroom-users/delete/`, data });

// END CHATROOM USERS
// CHATROOMS
export const getChatrooms = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/chatrooms?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || 20}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getChatroom = ({ id }) =>
  request({ url: `/chatrooms/${id}`, method: "GET" });

export const addChatroom = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/chatrooms" : `/chatrooms/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteChatroom = ({ id }) =>
  request({ url: `/chatrooms/delete/${id}` });

export const uploadChatImage = ({ id, data }) =>
  request({ url: `/chatrooms/image/${id}`, data, file: true });

// END CHATROOM
// USERS
export const getUsers = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/users?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getUser = ({ id }) =>
  request({ url: `/users/${id}`, method: "GET" });

export const addUser = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/users" : `/users/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteUser = ({ id }) =>
  request({ url: `/users/delete/${id}` });

export const uploadUserImage = ({ id, data }) =>
  request({ url: `/users/avatar/${id}`, data, file: true });

// END USERS
// FEEDBACKS
export const getFeedbacks = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/feedbacks?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getFeedback = ({ id }) =>
  request({ url: `/feedbacks/${id}`, method: "GET" });

export const addFeedback = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/feedbacks" : `/feedbacks/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteFeedback = ({ id }) =>
  request({ url: `/feedbacks/delete/${id}` });

export const uploadFeedbackImage = ({ id, data }) =>
  request({ url: `/feedbacks/image/${id}`, data, file: true });

// END FEEDBACKS
// PARTICIPANT Company
export const getParticipantCompanies = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/participant-companies?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getParticipantCompany = ({ id }) =>
  request({ url: `/participant-companies/${id}`, method: "GET" });

export const addParticipantCompany = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/participant-companies" : `/participant-companies/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteParticipantCompany = ({ id }) =>
  request({ url: `/participant-companies/delete/${id}` });

export const uploadParticipantCompanyImage = ({ id, data }) =>
  request({ url: `/participant-companies/image/${id}`, data, file: true });

// END PARTICIPANT COMPANIES
// PARTICIPANT CATEGORIES
export const getParticipantCategories = ({
  page,
  keyword,
  limit,
  eventId,
}) =>
  request({
    url: `/participant-categories?page=${page || 1}&keyword=${keyword || ""}&limit=${limit || ""}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const getParticipantCategory = ({ id }) =>
  request({ url: `/participant-categories/${id}`, method: "GET" });

export const addParticipantCategory = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/participant-categories" : `/participant-categories/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteParticipantCategory = ({ id }) =>
  request({ url: `/participant-categories/delete/${id}` });

// END PARTICIPANT CATEGORIES
//ADD COMPANIES TO CATEGORIES
export const getCompaniesOfCategory = ({
  id,
  page,
  limit,
  keyword,
}) =>
  request({
    url: `/category-companies/${id}?page=${page || 1}&limit=${limit}&keyword=${keyword || ""}`,
    method: "GET",
  });
export const addCompanyToCategory = ({ data }) =>
  request({
    url: "/category-companies",
    data,
    method: "POST",
  });
export const deleteCompanyFromCategory = ({ data }) =>
  request({
    url: "/category-companies/delete",
    data,
    method: "POST",
  });
//END ADD COMPANIES TO CATEGORIES
// EVENTS
export const getEvents = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/events?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getEvent = ({ id }) =>
  request({ url: `/events/${id}`, method: "GET" });

export const addEvent = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/events" : `/events/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteEvent = ({ id }) =>
  request({ url: `/events/delete/${id}` });

export const uploadEventLogo = ({ id, data }) =>
  request({ url: `/events/logo/${id}`, data, file: true });

export const uploadEventBanner = ({ id, data }) =>
  request({ url: `/events/banner/${id}`, data, file: true });

// END EVENTS
// AGENDAS
export const getAgendas = ({
  page,
  keyword,
  limit,
  eventId
}) =>
  request({
    url: `/agendas?page=${page || 1}&limit=${limit || ""}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const getAgenda = ({ id }) =>
  request({ url: `/agendas/${id}`, method: "GET" });

export const addAgenda = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/agendas" : `/agendas/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteAgenda = ({ id }) =>
  request({ url: `/agendas/delete/${id}` });

// END AGENDAS
// SESSIONS
export const getSessions = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
  eventId
}) =>
  request({
    url: `/sessions?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const getSession = ({ id }) =>
  request({ url: `/sessions/${id}`, method: "GET" });

export const addSession = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/sessions" : `/sessions/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteSession = ({ id }) =>
  request({ url: `/sessions/delete/${id}` });

// END SESSIONS
// GALLERY
export const getGalleries = ({
  page,
  keyword,
  limit,
  eventId,
}) =>
  request({
    url: `/galleries?page=${page || 1}&keyword=${keyword || ""}&limit=${limit || ""}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const getGallery = ({ id }) =>
  request({ url: `/galleries/${id}`, method: "GET" });

export const addGallery = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/galleries" : `/galleries/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteGallery = ({ id }) =>
  request({ url: `/galleries/delete/${id}` });

export const uploadGalleryImage = ({ id, data }) =>
  request({ url: `/galleries/image/${id}`, data, file: true });
export const deleteGalleryImage = ({ id, data }) =>
  request({ url: `/galleries/image/delete/${id}`, data });
export const uploadGalleryCoverImage = ({ id, data }) =>
  request({ url: `/galleries/cover/${id}`, data, file: true });

// END GALLERY
// SPEAKERS
export const getSpeakers = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
  sessionId
}) =>
  request({
    url: `/speakers?sessionId=${sessionId || ""}&page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || 20}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getSpeaker = ({ id }) =>
  request({ url: `/speakers/${id}`, method: "GET" });

export const addSpeaker = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/speakers" : `/speakers/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteSpeaker = ({ id }) =>
  request({ url: `/speakers/delete/${id}` });

export const uploadSpeakerImage = ({ id, data }) =>
  request({ url: `/speakers/image/${id}`, data, file: true });

export const uploadSpeakerOrgImage = ({ id, data }) =>
  request({ url: `/speakers/org/${id}`, data, file: true });

// END SPEAKERS
//ADD SPEAKER TO SESSION
export const addSpeakerToSession = ({ data }) =>
  request({
    url: "/session-speakers",
    data,
    method: "POST",
  });
export const deleteSpeakerFromSession = ({ data }) =>
  request({
    url: "/session-speakers/delete",
    data,
    method: "POST",
  });
//END ADD SPEAKER TO SESSION

// AIRPORTS
export const getAirports = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/flight-countries?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getAirport = ({ id }) =>
  request({ url: `/flight-countries/${id}`, method: "GET" });

export const addAirport = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/flight-countries" : `/flight-countries/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteAirport = ({ id }) =>
  request({ url: `/flight-countries/delete/${id}` });

// END AIRPORTS
// AVAILABLE FLIGHTS
export const getFlights = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/available-flights?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getFlight = ({ id }) =>
  request({ url: `/available-flights/${id}`, method: "GET" });

export const addFlight = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/available-flights" : `/available-flights/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteFlight = ({ id }) =>
  request({ url: `/available-flights/delete/${id}` });

// END AVAILABLE FLIGHTS
// TRANSFERS
export const getTransfers = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/transfers?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getTransfer = ({ id }) =>
  request({ url: `/transfers/${id}`, method: "GET" });

export const addTransfer = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/transfers" : `/transfers/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteTransfer = ({ id }) =>
  request({ url: `/transfers/delete/${id}` });

export const uploadTransferImage = ({ id, data }) =>
  request({ url: `/transfers/image/${id}`, data, file: true });
// END TRANSFERS
// TRANSFER FEATURES
export const getTransferFeatures = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
  transferId
}) =>
  request({
    url: `/transfer-features?transferId=${transferId}&page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getTransferFeature = ({ id }) =>
  request({ url: `/transfer-features/${id}`, method: "GET" });

export const addTransferFeature = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/transfer-features" : `/transfer-features/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteTransferFeature = ({ id }) =>
  request({ url: `/transfer-features/delete/${id}` });
// END TRANSFER FEATURES
// HOTELS
export const getEventHotels = ({
  id,
  page,
  keyword,
  limit,
}) =>
  request({
    url: `/event-hotels/${id}?page=${page || 1}&keyword=${keyword || ""}&limit=${limit || ""}`,
    method: "GET",
  });
export const addHotelToEvent = ({ data }) =>
  request({
    url: "/event-hotels",
    data,
    method: "POST",
  });
export const deleteHotelFromEvent = ({ data }) =>
  request({
    url: "/event-hotels/delete",
    data,
    method: "POST",
  });
// END HOTELS
// HOTELS
export const getHotels = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/hotels?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getHotel = ({ id }) =>
  request({ url: `/hotels/${id}`, method: "GET" });

export const addHotel = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/hotels" : `/hotels/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteHotel = ({ id }) =>
  request({ url: `/hotels/delete/${id}` });

export const uploadHotelImage = ({ id, data }) =>
  request({ url: `/hotels/image/${id}`, data, file: true });
// END HOTELS
// HOTEL FEATURES
export const getHotelFeatures = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
  hotelId
}) =>
  request({
    url: `/room-features?hotelId=${hotelId}&page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getHotelFeature = ({ id }) =>
  request({ url: `/room-features/${id}`, method: "GET" });

export const addHotelFeature = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/room-features" : `/room-features/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteHotelFeature = ({ id }) =>
  request({ url: `/room-features/delete/${id}` });
// END HOTEL FEATURES
// HOTEL ROOMS
export const getHotelRooms = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/hotel-rooms?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getHotelRoom = ({ id }) =>
  request({ url: `/hotel-rooms/${id}`, method: "GET" });

export const addHotelRoom = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/hotel-rooms" : `/hotel-rooms/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteHotelRoom = ({ id }) =>
  request({ url: `/hotel-rooms/delete/${id}` });
export const uploadHotelRoomImage = ({ id, data }) =>
  request({ url: `/hotel-rooms/image/${id}`, data, file: true });
// END HOTEL ROOMS
//ACCOMMODATION REQUESTS
export const getAccomodationRequests = ({ limit, page, eventId }) =>
  request({
    url: `/accomodation-request?limit=${limit | ""}&page=${page || 1}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const getAccomodationRequest = ({ id }) =>
  request({ url: `/accomodation-request/${id}`, method: "GET" });

export const addAccomodationRequest = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/accomodation-request" : `/accomodation-request/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });

export const deleteAccomodationRequest = ({ id }) =>
  request({ url: `/accomodation-request/delete/${id}` });
//END ACCOMODATION REQUESTS
//ACCOMMODATION REQUESTS
export const getFlightRequests = ({ limit, page, eventId }) =>
  request({
    url: `/flight-request?limit=${limit | ""}&page=${page || 1}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const getFlightRequest = ({ id }) =>
  request({ url: `/flight-request/${id}`, method: "GET" });

export const addFlightRequest = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/flight-request" : `/flight-request/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });

export const deleteFlightRequest = ({ id }) =>
  request({ url: `/flight-request/delete/${id}` });
//END ACCOMODATION REQUESTS
//DELEGATE REQUESTS
export const getDelegates = ({ limit, page }) =>
  request({
    url: `/delegate-register?limit=${limit | ""}&page=${page || 1}`,
    method: "GET",
  });
export const getDelegate = ({ id }) =>
  request({ url: `/delegate-register/${id}`, method: "GET" });

export const addDelegate = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/delegate-register" : `/delegate-register/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });

export const deleteDelegate = ({ id }) =>
  request({ url: `/delegate-register/delete/${id}` });
//END DELEGATE REQUESTS
//NOTIFICATIONS
export const getNotifications = ({ limit, page, eventId }) =>
  request({
    url: `/notifications?limit=${limit | ""}&page=${page || 1}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const getNotification = ({ id }) =>
  request({ url: `/notifications/${id}`, method: "GET" });

export const addNotification = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/notifications" : `/notifications/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });

export const deleteNotification = ({ id }) =>
  request({ url: `/notifications/delete/${id}` });

export const uploadNotificationImage = ({ id, data }) =>
  request({ url: `/notifications/image/${id}`, data, file: true });
//END NOTIFICATIONS

//NEWS
export const getNews = ({ limit, page }) =>
  request({
    url: `/news?limit=${limit | ""}&page=${page || 1}`,
    method: "GET",
  });
export const getOneNews = ({ id }) =>
  request({ url: `/news/${id}`, method: "GET" });

export const addNews = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/news" : `/news/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });

export const deleteNews = ({ id }) =>
  request({ url: `/news/delete/${id}` });

export const uploadNewsImage = ({ id, data }) =>
  request({ url: `/news/image/${id}`, data, file: true });
//END NEWS

//WARNING DESK
export const getWarningTexts = ({ limit, page }) =>
  request({
    url: `/warning-desk?limit=${limit | ""}&page=${page || 1}`,
    method: "GET",
  });
export const getWarningText = ({ id }) =>
  request({ url: `/warning-desk/${id}`, method: "GET" });

export const addWarningText = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/warning-desk" : `/warning-desk/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });

export const deleteWarningText = ({ id }) =>
  request({ url: `/warning-desk/delete/${id}` });
//END WARNING DESK
//QUESTIONS AND ANSWERS
export const getQuestionAnswers = ({ limit, page, eventId }) =>
  request({
    url: `/question-answers?limit=${limit | ""}&page=${page || 1}&eventId=${eventId || 1}`,
    method: "GET",
  });
export const getQuestionAnswer = ({ id }) =>
  request({ url: `/question-answers/${id}`, method: "GET" });

export const addQuestionAnswer = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/question-answers" : `/question-answers/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });

export const deleteQuestionAnswer = ({ id }) =>
  request({ url: `/question-answers/delete/${id}` });
//END QUESTIONS AND ANSWERS
// UPCOMING EVENTS
export const getUpcomingEvents = ({
  page,
  keyword,
  limit,
  as,
  sort_by,
}) =>
  request({
    url: `/upcoming-events?page=${page || 1}&keyword=${keyword || ""
      }&limit=${limit || ""}&as=${as || ""}&sort_by=${sort_by || ""}`,
    method: "GET",
  });
export const getUpcomingEvent = ({ id }) =>
  request({ url: `/upcoming-events/${id}`, method: "GET" });

export const addUpcomingEvent = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/upcoming-events" : `/upcoming-events/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteUpcomingEvent = ({ id }) =>
  request({ url: `/upcoming-events/delete/${id}` });

export const uploadUpcomingEventImage = ({ id, data }) =>
  request({ url: `/upcoming-events/image/${id}`, data, file: true });
// END UPCOMING EVENTS
//ABOUT CONFERENCE
export const getAboutConferences = ({
  page,
  limit,
}) =>
  request({
    url: `/about-conference?page=${page || 1}&limit=${limit || ""}`,
    method: "GET",
  });

export const getAboutConference = ({ id }) =>
  request({ url: `/about-conference/${id}`, method: "GET" });


export const addAboutConference = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/about-conference" : `/about-conference/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const deleteAboutConference = ({ id }) =>
  request({ url: `/about-conference/delete/${id}` });
//END ABOUT CONF

//FLOOR PLAN
export const getFloorPlans = ({
  page,
  limit,
  eventId,
}) =>
  request({
    url: `/floor-plans?page=${page || 1}&limit=${limit || ""}&eventId=${eventId || ""}`,
    method: "GET",
  });
export const getFloorPlan = ({ id }) =>
  request({ url: `/floor-plans/${id}`, method: "GET" });

export const addFloorPlan = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/floor-plans" : `/floor-plans/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PATCH"}`,
  });
export const uploadFloorPlanImage = ({ id, data, lang }) =>
  request({ url: `/floor-plans/image-${lang}/${id}`, data, file: true });
export const deleteFloorPlan = ({ id }) =>
  request({ url: `/floor-plans/delete/${id}` });
//END FLOOR PLAN

export const getTerms = ({ }) => request({ url: `/terms`, method: "GET" });

export const getAbout = ({ }) => request({ url: `/about`, method: "GET" });

// GET ONE

// Получить вопросы по ивенту
export const getQuestionsByEvent = (eventId) => {
  return request({
    url: `/questions-to-speak/event/${eventId}`, 
    method: "get",
  });
};
// Обновить видимость вопроса
export const updateQuestionVisibility = (id, isVisible) => {
  return request({
    url: `/questions-to-speak/${id}/visibility`,
    method: "patch",
    data: { isVisible },
  });
};

// Удалить вопрос
export const deleteQuestion = (id) => {
  return request({
    url: `/questions-to-speak/${id}`,
    method: "delete",
  });
};

export const getCompanyCategories = () =>
  request({ url: `/company-categories`, method: "GET" });

export const getCompanyCategory = ({ id }) =>
  request({ url: `/company-categories/${id}`, method: "GET" });

export const addCompanyCategory = ({ data, id }) =>
  request({
    url: `${id == 0 ? "/company-categories" : `/company-categories/${id}`}`,
    data,
    method: `${id == 0 ? "POST" : "PUT"}`, 
  });

export const deleteCompanyCategory = ({ id }) =>
  request({ url: `/company-categories/${id}`, method: "DELETE" });

