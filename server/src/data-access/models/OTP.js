const Objection = require("../db-config")
const { DateTime } = require("luxon")

class OTP extends Objection {
  static get tableName() {
    return "otps"
  }

  static get relationMappings() {
    const Reservation = require("./Reservation")

    return {
      reservation: {
        relation: Objection.BelongsToOneRelation,
        modelClass: Reservation,
        join: {
          from: "otps.reservation_id",
          to: "reservations.id",
        },
      },
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["reservation_id", "otp"],
      properties: {
        id: { type: "integer" },
        reservation_id: { type: "integer" },
        otp: { type: "integer" },
      },
    }
  }

  $beforeInsert(queryContext) {
    this.created_at = DateTime.local().toISO()
    this.updated_at = DateTime.local().toISO()
  }

  $beforeUpdate(opt, queryContext) {
    this.updated_at = DateTime.local().toISO()
  }
}
