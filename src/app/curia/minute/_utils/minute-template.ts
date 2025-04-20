import { MinuteFormData } from '../_components/minute-form/types/minute-form-data.type';

/**
 * Template for the minute text
 * Use {{markers}} to indicate where form values should be inserted
 */
export const minuteTemplate = `Ata nº {{minuteNumber}} da reunião realizada em {{meetingDate}} na {{parish}}, da {{curia}}.

A reunião teve início às {{startTime}}, a Catena foi rezada às {{catenaTime}} e o encerramento ocorreu às {{endTime}}. Estavam presentes {{attendees}} membros. A acolhida foi realizada por {{welcome}}.

A ata {{readStatus}}, {{approvalStatus}} e {{signedStatus}}. {{reasonNotRead}}

{{readerName}} {{readerGender}} a leitura espiritual intitulada "{{readingTitle}}", da página {{readingPage}}, capítulo {{readingChapter}}, item {{readingItem}}.

{{appointmentsText}}

O saldo anterior era de R$ {{previousBalance}}. A coleta do dia foi de R$ {{dailyCollection}}. A última reunião ocorreu em {{lastMeetingDate}}.

{{contributionsText}}

{{expensesText}}

O saldo final é de R$ {{finalBalance}}.

{{reportsText}}

A próxima reunião está prevista para {{nextMeeting}}. O próximo relatório será apresentado pelo Praesidium {{nextReport}}.

{{allocationAuthor}} realizou a alocução com a seguinte mensagem: "{{allocationMessage}}". {{allocationSource}}`;

/**
 * Function to fill the template with form values
 */
export function fillTemplate(
  template: string,
  formData: MinuteFormData,
): string {
  if (!formData) return template;

  let filledText = template;

  // Basic information
  filledText = filledText.replace(
    /{{minuteNumber}}/g,
    formData.minuteNumber || '',
  );
  filledText = filledText.replace(/{{parish}}/g, formData.parish || '');
  filledText = filledText.replace(/{{curia}}/g, formData.curia || '');
  filledText = filledText.replace(/{{startTime}}/g, formData.startTime || '');
  filledText = filledText.replace(/{{catenaTime}}/g, formData.catenaTime || '');
  filledText = filledText.replace(/{{endTime}}/g, formData.endTime || '');
  filledText = filledText.replace(/{{attendees}}/g, formData.attendees || '');
  filledText = filledText.replace(/{{welcome}}/g, formData.welcome || '');

  // Formatted dates
  if (formData.meetingDate) {
    const formattedDate = new Date(formData.meetingDate).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    );
    filledText = filledText.replace(/{{meetingDate}}/g, formattedDate);
  } else {
    filledText = filledText.replace(/{{meetingDate}}/g, '');
  }

  if (formData.treasury?.lastMeetingDate) {
    const formattedDate = new Date(
      formData.treasury.lastMeetingDate,
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    filledText = filledText.replace(/{{lastMeetingDate}}/g, formattedDate);
  } else {
    filledText = filledText.replace(/{{lastMeetingDate}}/g, '');
  }

  if (formData.nextMeeting) {
    const formattedDate = new Date(formData.nextMeeting).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    );
    filledText = filledText.replace(/{{nextMeeting}}/g, formattedDate);
  } else {
    filledText = filledText.replace(/{{nextMeeting}}/g, '');
  }

  // Minute status
  if (formData.minuteStatus) {
    filledText = filledText.replace(
      /{{readStatus}}/g,
      formData.minuteStatus.read ? 'foi lida' : 'não foi lida',
    );
    filledText = filledText.replace(
      /{{approvalStatus}}/g,
      formData.minuteStatus.approved ? 'foi aprovada' : 'não foi aprovada',
    );
    filledText = filledText.replace(
      /{{signedStatus}}/g,
      formData.minuteStatus.signed ? 'foi assinada' : 'não foi assinada',
    );

    if (!formData.minuteStatus.read && formData.minuteStatus.reasonNotRead) {
      filledText = filledText.replace(
        /{{reasonNotRead}}/g,
        `Motivo da não leitura: ${formData.minuteStatus.reasonNotRead}.`,
      );
    } else {
      filledText = filledText.replace(/{{reasonNotRead}}/g, '');
    }
  } else {
    filledText = filledText.replace(/{{readStatus}}/g, '');
    filledText = filledText.replace(/{{approvalStatus}}/g, '');
    filledText = filledText.replace(/{{signedStatus}}/g, '');
    filledText = filledText.replace(/{{reasonNotRead}}/g, '');
  }

  // Spiritual reading
  if (formData.spiritualReading) {
    filledText = filledText.replace(
      /{{readerName}}/g,
      formData.spiritualReading.readerName || '',
    );

    const gender =
      formData.spiritualReading.readerGender === 'male'
        ? 'realizou'
        : 'realizou';
    filledText = filledText.replace(/{{readerGender}}/g, gender);

    filledText = filledText.replace(
      /{{readingTitle}}/g,
      formData.spiritualReading.title || '',
    );
    filledText = filledText.replace(
      /{{readingPage}}/g,
      formData.spiritualReading.page || '',
    );
    filledText = filledText.replace(
      /{{readingChapter}}/g,
      formData.spiritualReading.chapter || '',
    );
    filledText = filledText.replace(
      /{{readingItem}}/g,
      formData.spiritualReading.item || '',
    );
  } else {
    filledText = filledText.replace(/{{readerName}}/g, '');
    filledText = filledText.replace(/{{readerGender}}/g, 'realizou');
    filledText = filledText.replace(/{{readingTitle}}/g, '');
    filledText = filledText.replace(/{{readingPage}}/g, '');
    filledText = filledText.replace(/{{readingChapter}}/g, '');
    filledText = filledText.replace(/{{readingItem}}/g, '');
  }

  // Appointments
  if (formData.appointments && formData.appointments.length > 0) {
    let appointmentsText = 'Foram realizadas as seguintes nomeações: ';

    formData.appointments.forEach((appointment: any, index: number) => {
      if (appointment.name && appointment.praesidium && appointment.position) {
        appointmentsText += `${appointment.name} do Praesidium ${appointment.praesidium} para o cargo de ${appointment.position}`;

        if (index < (formData?.appointments ?? []).length - 1) {
          appointmentsText += '; ';
        } else {
          appointmentsText += '.';
        }
      }
    });

    filledText = filledText.replace(/{{appointmentsText}}/g, appointmentsText);
  } else {
    filledText = filledText.replace(
      /{{appointmentsText}}/g,
      'Não houve nomeações nesta reunião.',
    );
  }

  // Treasury
  if (formData.treasury) {
    filledText = filledText.replace(
      /{{previousBalance}}/g,
      formData.treasury.previousBalance || '',
    );
    filledText = filledText.replace(
      /{{dailyCollection}}/g,
      formData.treasury.dailyCollection || '',
    );
    filledText = filledText.replace(
      /{{finalBalance}}/g,
      formData.treasury.finalBalance || '',
    );

    // Contributions
    if (
      formData.treasury.contributions &&
      formData.treasury.contributions.length > 0
    ) {
      let contributionsText = 'Foram recebidas as seguintes contribuições: ';

      formData.treasury.contributions.forEach(
        (contribution: any, index: number) => {
          if (contribution.praesidium && contribution.amount) {
            contributionsText += `${contribution.praesidium}: R$ ${contribution.amount}`;

            if (index < formData.treasury.contributions.length - 1) {
              contributionsText += '; ';
            } else {
              contributionsText += '.';
            }
          }
        },
      );

      filledText = filledText.replace(
        /{{contributionsText}}/g,
        contributionsText,
      );
    } else {
      filledText = filledText.replace(
        /{{contributionsText}}/g,
        'Não houve contribuições registradas.',
      );
    }

    // Expenses
    if (formData.treasury.expenses && formData.treasury.expenses.length > 0) {
      let expensesText = 'Foram registradas as seguintes despesas: ';

      formData.treasury.expenses.forEach((expense: any, index: number) => {
        if (expense.name && expense.amount) {
          expensesText += `${expense.name}: R$ ${expense.amount}`;

          if (index < formData.treasury.expenses.length - 1) {
            expensesText += '; ';
          } else {
            expensesText += '.';
          }
        }
      });

      filledText = filledText.replace(/{{expensesText}}/g, expensesText);
    } else {
      filledText = filledText.replace(
        /{{expensesText}}/g,
        'Não houve despesas registradas.',
      );
    }
  } else {
    filledText = filledText.replace(/{{previousBalance}}/g, '');
    filledText = filledText.replace(/{{dailyCollection}}/g, '');
    filledText = filledText.replace(/{{finalBalance}}/g, '');
    filledText = filledText.replace(
      /{{contributionsText}}/g,
      'Não houve contribuições registradas.',
    );
    filledText = filledText.replace(
      /{{expensesText}}/g,
      'Não houve despesas registradas.',
    );
  }

  // Reports
  if (formData.reports && formData.reports.length > 0) {
    let reportsText = '';

    formData.reports.forEach((report: any, index: number) => {
      if (report.praesidium) {
        reportsText += `Relatório ${index + 1} - ${report.praesidium}: `;

        if (report.number) {
          reportsText += `Relatório nº ${report.number}. `;
        }

        if (report.mysteries) {
          reportsText += `Mistérios contemplados: ${report.mysteries}. `;
        }

        if (report.rosaries) {
          reportsText += `Rosários: ${report.rosaries}. `;
        }

        if (report.otherPrayers && report.otherPrayers.length > 0) {
          reportsText += 'Outras orações: ';

          report.otherPrayers.forEach((prayer: any, prayerIndex: number) => {
            if (prayer.name && prayer.amount) {
              reportsText += `${prayer.name}: ${prayer.amount}`;

              if (prayerIndex < report.otherPrayers.length - 1) {
                reportsText += '; ';
              } else {
                reportsText += '. ';
              }
            }
          });
        }

        if (report.workHours) {
          reportsText += `Total de horas de trabalho: ${report.workHours}. `;
        }

        if (report.invitationsMade) {
          reportsText += `Convites feitos: ${report.invitationsMade}. `;
        }

        if (report.invitationsAccepted) {
          reportsText += `Convites aceitos: ${report.invitationsAccepted}. `;
        }

        if (
          report.adultContacts ||
          report.youthContacts ||
          report.adolescentContacts ||
          report.childContacts
        ) {
          reportsText += 'Contatos: ';

          if (report.adultContacts) {
            reportsText += `${report.adultContacts} adultos, `;
          }

          if (report.youthContacts) {
            reportsText += `${report.youthContacts} jovens, `;
          }

          if (report.adolescentContacts) {
            reportsText += `${report.adolescentContacts} adolescentes, `;
          }

          if (report.childContacts) {
            reportsText += `${report.childContacts} crianças. `;
          }
        }

        if (index < formData.reports.length - 1) {
          reportsText += '\n\n';
        }
      }
    });

    filledText = filledText.replace(/{{reportsText}}/g, reportsText);
  } else {
    filledText = filledText.replace(
      /{{reportsText}}/g,
      'Não foram apresentados relatórios nesta reunião.',
    );
  }

  // Next report
  filledText = filledText.replace(/{{nextReport}}/g, formData.nextReport || '');

  // Allocution
  if (formData.allocution) {
    filledText = filledText.replace(
      /{{allocationAuthor}}/g,
      formData.allocution.author || '',
    );
    filledText = filledText.replace(
      /{{allocationMessage}}/g,
      formData.allocution.message || '',
    );

    if (formData.allocution.source) {
      filledText = filledText.replace(
        /{{allocationSource}}/g,
        `Fonte: ${formData.allocution.source}.`,
      );
    } else {
      filledText = filledText.replace(/{{allocationSource}}/g, '');
    }
  } else {
    filledText = filledText.replace(/{{allocationAuthor}}/g, '');
    filledText = filledText.replace(/{{allocationMessage}}/g, '');
    filledText = filledText.replace(/{{allocationSource}}/g, '');
  }

  return filledText;
}
