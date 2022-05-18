module.exports = {
  GET_ISSUES_BY_VISIT_ID:
    "SELECT " +
    "issues.id as issueId, " +
    "issues.description, " +
    "issues.startTime, " +
    "issues.endTime, " +
    "issues.price, " +
    "issues.closed, " +
    "specialist.id as specialistId, " +
    "specialist.experience, " +
    "speciality.id as speicalityId, " +
    "speciality.name, " +
    "worker.id as workerId, " +
    "worker.firstName, " +
    "worker.lastName, " +
    "worker.fatherName " +
    "FROM issues, user_visit, specialist, worker, speciality " +
    "WHERE issues.id_user_visit = ? AND user_visit.status = ? AND " +
    "issues.id_user_visit = user_visit.id AND " +
    "issues.id_specialist = specialist.id AND " +
    "specialist.id_worker = worker.id AND " +
    "specialist.id_speciality = speciality.id",
  EDIT_SPECIALIST: 
    "UPDATE specialist " +
    "SET isBusy = ?, startTime = ?, endTime = ? " +
    "WHERE id = ?",
  ADD_SPECIALIST: 
    "INSERT INTO specialist " +
    "(id_worker, id_speciality, experience, isBusy) " +
    "VALUES ?",
  DELETE_SPECIALIST:
    "DELETE FROM specialist WHERE id_worker = ? AND id_speciality = ?",
  ADD_ISSUE: 
    "INSERT INTO issues " +
    "(id_user_visit, id_specialist, description, startTime, endTime, price, closed) " +
    "VALUES ?",
  DELETE_ISSUE:
    "DELETE FROM issues WHERE id = ?",
  CLOSE_ISSUE:
    "UPDATE issues SET closed = 'Yes' WHERE id = ?",
  GET_WORKER_SPECIALITIES:
    "SELECT speciality.id, speciality.name FROM speciality, specialist, worker " +
    "WHERE worker.id = specialist.id_worker AND " +
    "specialist.id_speciality = speciality.id AND " +
    "worker.id = ?",
  GET_ALL_SPECIALITIES:
    "SELECT * FROM speciality",
  GET_VISIT_BY_ID:
    "SELECT user_visit.dateOfVisit, user_visit.id_car, user_visit.status, " +
    "user.phoneNumber, user.firstName, user.lastName, user.fatherName, user.dateOfBirth, user.discount, user.email, " +
    "user_car.name, user_car.model, user_car.color, user_car.year, user_car.carcas, user_car.engine, user_car.number, user_car.transmission, user_car.engineNumber " +
    "FROM user_visit, user, user_car " +
    "WHERE user_visit.id_user = user.id AND user_visit.id_car = user_car.id AND user_visit.id = ?",
  GET_FREE_WORKERS_FOR_TIME:
    "SELECT " +
    "specialist.id AS specialistId, " +
    "worker.id AS workerId, " +
    "worker.firstName, " +
    "worker.lastName, " +
    "worker.fatherName, " +
    "worker.phoneNumber, " +
    "specialist.experience, " +
    "speciality.name AS speciality " +
    "FROM worker, specialist, speciality WHERE " +
    "specialist.id NOT IN ( " +
    "SELECT specialist.id FROM specialist, issues WHERE " +
    "(DATE(issues.startTime) >= ? AND DATE(issues.startTime) <= ? OR " +
    "DATE(issues.endTime) >= ? AND DATE(issues.endTime) <= ?) AND issues.id_specialist = specialist.id " +
    "AND issues.closed != 'Yes') " +
    "AND worker.id = specialist.id_worker AND specialist.id_speciality = speciality.id",
  GET_WORKLOAD:
    "SELECT " +
    "SUM(timestampdiff(MINUTE, issues.startTime, issues.endTime)) AS workload, " +
    "issues.id_specialist, " +
    "worker.firstName, " +
    "worker.lastName, " +
    "worker.fatherName, " +
    "worker.id, " +
    "speciality.name " +
    "FROM issues, specialist, worker, speciality " +
    "WHERE closed = 'Yes' AND " +
    "issues.id_specialist = specialist.id AND " +
    "specialist.id_worker = worker.id AND " +
    "specialist.id_speciality = speciality.id " +
    "group by issues.id_specialist",
};
