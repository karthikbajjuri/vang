(function ($) {
  var dataLayerMapping = {
    'download the report': {
      key0: 'Explore 2021 insights',
      key1: 'HAS 2021 Page - Hero',
      key2: 'Explore 2021 insights',
    },
    'sign up today': {
      key0: 'Sign up today',
      key1: 'HAS 2021 Page - Meet the experts',
      key2: 'Sign up today',
    },
    'automatic solutions': {
      key0: 'Explore insight',
      key1: 'HAS 2021 Page - Automatic Solutions',
      key2: 'Explore insight',
    },
    'participant advice': {
      key0: 'Explore insight',
      key1: 'HAS 2021 Page - Participant Advice',
      key2: 'Explore insight',
    },
    'the retiree-friendly plan': {
      key0: 'Explore insight',
      key1: 'HAS 2021 Page - The retiree-Friendly Plan',
      key2: 'Explore insight',
    },
    'loans and withdrawals': {
      key0: 'Explore insight',
      key1: 'HAS 2021 Page - Loans and Withdrawals',
      key2: 'Explore insight',
    },
    'download insights': {
      key0: 'Download insights',
      key1: 'HAS 2021 Page - Insights to Action',
      key2: 'Download insights',
    },
    'download 2021 report': {
      key0: 'HAS 2021 Report',
      key1: 'HAS 2021 Page - Real data',
      key2: 'Report',
    },
    'download research report': {
      key0: 'Download research report',
      key1: 'HAS 2021 Page - Real data',
      key2: 'Download research report',
    },
    'our press room': {
      key0: 'Our press room',
      key1: 'HAS 2021 Page - Press inquiries',
      key2: 'Our press room',
    },
    'email media relations': {
      key0: 'Email media relations',
      key1: 'HAS 2021 Page - Press inquiries',
      key2: 'Email media relations',
    },
  };

  var elselc = '.vg-rightchart__left__link , .vg-rightchart__left__link, .cmp-teaser__action-link, .vg_data_enables  a';

  $ (document).ready (function ($) {
    $ (elselc).on ('click', function () {
      var fileUrl = $ (this).attr ('href') || '';
      // pass data-item-name for embed items else use button text.
      var buttonText =
        $ (this).attr ('data-item-name') || $ (this).text () || '';

      // Downloadable Items.
      if (fileUrl && fileUrl.indexOf(".pdf") > 0) {
        var fileUri = fileUrl.substring (fileUrl.lastIndexOf ('/') + 1)   || '';
        var fileNameParts = "";
        if(fileUrl.indexOf(".pdf#") > 0) {
            fileNameParts = fileUri.substring(0,fileUrl.indexOf('#').split("."));
        } else {
            fileNameParts = fileUri.split ('.');
        }
        if (fileNameParts.length > 1) {
          var fileLocation = window.location.href;
          var fileName = fileNameParts[1] + ':' + decodeURI(fileNameParts[0]);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push ({
            event: 'contentDownloaded',
            linkInfo: {
              fileLocation: fileLocation,
              fileName: fileName,
            }
          });
        }
      }
      // CTA Events
      if (buttonText && dataLayerMapping[buttonText.toLowerCase ()]) {
        buttonText = buttonText.toLowerCase ();
        var currentObj = dataLayerMapping[buttonText];
        window.dataLayer = window.dataLayer || [];
        // datalayer push code
        window.dataLayer.push ({
            event: 'contentDownloaded',
            linkInfo: {
              fileLocation: fileLocation,
              fileName: fileName,
            },
        });
      }
    });
  });
}) (jQuery);
