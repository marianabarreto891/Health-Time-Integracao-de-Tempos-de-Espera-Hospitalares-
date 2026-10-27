db.TemposEsperaEmergencia.aggregate([
  {
    $project: {
      _id: 0,
      hospitalId: "$institutionId",
      emergencyType: "$EmergencyType.Description",
      timestamp: {
        $dateFromString: {
          dateString: "$LastUpdate",
        },
      },
      waiting: {
        nonUrgent: "$Triage.Green.Length",
        lessUrgent: "$Triage.Yellow.Length",
        urgent: "$Triage.Orange.Length",
        veryUrgent: "$Triage.Red.Length",
      },
    },
  },
  {
    $merge: {
      into: "UrgenciasSEC",
      whenMatched: "keepExisting",
      whenNotMatched: "insert",
    },
  },
]);
