# Dicom Editor

The aim of this application is to create a web page which allows to change the DICOM Tag of a set of DICOM file. While there are web pages which allows to edit the tag of a single file  ([here](https://dicom.innolitics.com/ciods/ct-image) and [here](https://rawgit.com/cornerstonejs/dicomParser/master/examples/simpleDeIdentify/index.html)) I was not able to find one which allows to change the tags of the entire study, or even multiple studies. Also for my mac I was not able to find an application which allows to do tag editing, beside installing dcm4chee or some other viewer.
This is *not* an anonymizer ad shall not be used as such. There are a number of TAG which might contain PHI that are not necessarily displayed by the application. 

The application is available on line here:
 🖐 To do !!

## Key features
- All the processing is local on our browser. Images are not uploaded nor processed anywhere.
- You can change tag for multiple studies and multiple patients at the same time.
- The ammount of data to process is only limited by the memory of the browser. On my mac I can easily process thousands of images. The implementation minimizes the memory usage.

## Limitations
- When downloading the images, the system is slow: about 3 images/sec. Unfortunately, this is a limitation due to the browser. Chrome will not be able to download images faster (I tested)
- Currently editing of DICOM tags in seqences is not supported.
- I rely on the DICOM parsing to [dcmjs](https://github.com/dcmjs-org/dcmjs), which is still under work. Therefore, you might run in some limitation/bug.

